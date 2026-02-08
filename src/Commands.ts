import { Configuration } from "./api-client/index.js";

export interface ProcessInfo {
    pid: number;
    command: string;
    startTime: Date;
    running?: boolean;
    exitCode?: number;
}

export interface CommandRunResponse {
    success: boolean;
    pid: number;
    command: string;
}

export interface CommandListResponse {
    success: boolean;
    processes: ProcessInfo[];
}

export interface CommandKillResponse {
    success: boolean;
    message: string;
}

export interface CommandWaitResponse {
    success: boolean;
    exitCode: number;
    error?: string;
}

export interface ProcessAttachHandlers {
    onStdout?: (data: string) => void;
    onStderr?: (data: string) => void;
    onExit?: (result: { exitCode: number; error?: string }) => void;
    onError?: (error: Error) => void;
    signal?: AbortSignal;
}

export class Commands {
    private sandboxId: string;
    private config: Configuration;

    constructor(sandboxId: string, config: Configuration) {
        this.sandboxId = sandboxId;
        this.config = config;
    }

    /**
     * Start a background process
     */
    async run(command: string, env?: Record<string, string>, cwd?: string, timeout?: number): Promise<CommandRunResponse> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.sandboxId}/commands/run`;
        const response = await fetchApi(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ command, env, cwd, timeout: timeout || 0 }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Failed to run command: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * List all running processes
     */
    async list(): Promise<CommandListResponse> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {};

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.sandboxId}/commands/list`;
        const response = await fetchApi(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Failed to list processes: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Kill a running process
     */
    async kill(pid: number): Promise<CommandKillResponse> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.sandboxId}/commands/kill`;
        const response = await fetchApi(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ pid }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Failed to kill process: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Attach to a running process and stream its output
     */
    async connect(pid: number, handlers: ProcessAttachHandlers = {}): Promise<void> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
        };

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.sandboxId}/commands/attach`;
        const response = await fetchApi(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ pid }),
            signal: handlers.signal,
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Failed to attach to process: ${response.status}`);
        }

        if (!response.body) {
            throw new Error('Attach response has no body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        const handleEvent = (event: string, data: string) => {
            if (event === 'stdout') {
                handlers.onStdout?.(data);
                return;
            }
            if (event === 'stderr') {
                handlers.onStderr?.(data);
                return;
            }
            if (event === 'exit') {
                try {
                    const parsed = JSON.parse(data);
                    handlers.onExit?.(parsed);
                } catch (err) {
                    handlers.onError?.(err as Error);
                }
            }
        };

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                buffer += decoder.decode(value, { stream: true });

                const parts = buffer.split('\n\n');
                buffer = parts.pop() || '';

                for (const part of parts) {
                    const lines = part.split('\n');
                    let event = 'message';
                    const dataLines: string[] = [];

                    for (const line of lines) {
                        if (line.startsWith('event:')) {
                            event = line.slice(6).trim();
                        } else if (line.startsWith('data:')) {
                            dataLines.push(line.slice(5).trimEnd());
                        }
                    }

                    const data = dataLines.join('\n');
                    if (data) {
                        handleEvent(event, data);
                    }
                }
            }
        } catch (err) {
            handlers.onError?.(err as Error);
            throw err;
        }
    }

    /**
     * Wait for a process to complete
     */
    async wait(pid: number): Promise<CommandWaitResponse> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.sandboxId}/commands/wait`;
        const response = await fetchApi(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ pid }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Failed to wait for process: ${response.status}`);
        }

        return await response.json();
    }
}
