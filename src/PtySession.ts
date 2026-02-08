import { Configuration, ExecutionApi } from './api-client/index.js';
import { wrapRequest } from './utils/runtime.js';
import { PtyOptions, RunCommandOptions } from './types.js';
import { WebSocketClient } from './utils/WebSocketClient.js';

export class PtySession {
    private client: WebSocketClient | null = null;
    private readonly sandboxId: string;
    private readonly config: Configuration;
    private readonly mode: 'ephemeral' | 'persistent';
    private sessionId?: string;
    private onData: (data: string) => void;
    private onClose?: () => void;
    private onError?: (error: Error) => void;
    private readonly execApi: ExecutionApi;

    /**
     * @internal
     */
    constructor(
        sandboxId: string,
        config: Configuration,
        mode: 'ephemeral' | 'persistent',
        options: PtyOptions
    ) {
        this.sandboxId = sandboxId;
        this.config = config;
        this.mode = mode;
        this.sessionId = options.sessionId;
        this.onData = options.onData;
        this.onClose = options.onClose;
        this.onError = options.onError;
        this.execApi = new ExecutionApi(this.config);
    }

    async connect(): Promise<void> {
        let path = '';
        if (this.mode === 'ephemeral') {
            path = `/sandboxes/${this.sandboxId}/pty`;
        } else {
            if (!this.sessionId) {
                throw new Error('Session ID is required for persistent PTY');
            }
            path = `/sandboxes/${this.sandboxId}/pty/sessions/${this.sessionId}`;
        }

        this.client = new WebSocketClient(path, this.config, {
            binaryType: 'arraybuffer',
            onMessage: (data: any) => {
                let text = '';
                if (data instanceof Buffer) {
                    text = data.toString('utf-8');
                } else if (typeof data === 'string') {
                    text = data;
                } else if (data instanceof ArrayBuffer) {
                    const decoder = new TextDecoder('utf-8');
                    text = decoder.decode(data);
                }
                this.onData && this.onData(text);
            },
            onClose: this.onClose,
            onError: this.onError
        });

        await this.client.connect();
        
        // Wait for initial prompt to be sent before returning
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    sendInput(data: string): void {
        if (!this.client) {
            throw new Error('PTY socket is not open');
        }
        this.client.send(data);
    }

    /**
     * Run a command and wait for a prompt to return.
     * This is useful for simple interactive automation.
     */
    async runCommand(command: string, options: RunCommandOptions = {}): Promise<string> {
        return new Promise((resolve, reject) => {
            const timeout = options.timeout || 30000;
            const prompt = options.prompt || /[$#>] $/;
            let output = '';

            const timer = setTimeout(() => {
                cleanup();
                reject(new Error(`Command timed out after ${timeout}ms. Collected output: ${output}`));
            }, timeout);

            const handleData = (data: string) => {
                output += data;
                if (typeof prompt === 'string') {
                    if (output.includes(prompt)) {
                        cleanup();
                        resolve(output);
                    }
                } else if (prompt instanceof RegExp) {
                    if (prompt.test(output)) {
                        cleanup();
                        resolve(output);
                    }
                }
            };

            const originalOnData = this.onData;
            this.onData = (data) => {
                originalOnData(data);
                handleData(data);
            };

            const cleanup = () => {
                clearTimeout(timer);
                this.onData = originalOnData;
            };

            try {
                this.sendInput(command.endsWith('\n') ? command : command + '\n');
            } catch (err) {
                cleanup();
                reject(err);
            }
        });
    }

    async resize(cols: number, rows: number) {
        if (this.mode === 'ephemeral') {
            console.warn('Resize is not supported for ephemeral PTY sessions');
            return;
        }


        await wrapRequest(this.execApi.resizeTerminal({
            id: this.sandboxId,
            sessionId: this.sessionId!,
            resizeTerminalRequest: { cols, rows }
        }));
    }

    close() {
        if (this.client) {
            this.client.close();
            this.client = null;
        }
    }
}
