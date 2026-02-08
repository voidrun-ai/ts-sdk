import { Configuration, ExecRequest, ExecutionApi, Sandbox, SandboxesApi } from "./api-client/index.js";
import { SandboxOptions, PtySessionInfo, ExecStreamHandlers, ExecStreamExit } from "./types.js";

import { FS } from "./FS.js";
import { PTY } from "./PTY.js";
import { CodeInterpreter, CodeExecutionOptions, CodeExecutionResult } from "./CodeInterpreter.js";
import { Commands } from "./Commands.js";
import { wrapRequest } from "./utils/runtime.js";

export default class VRSandbox {
    public readonly id: string;
    public readonly name: string;
    public readonly cpu: number;
    public readonly mem: number;
    public readonly orgId: string;
    public readonly createdAt: Date;
    public readonly createdBy: string;
    public readonly status: string;
    public readonly envVars?: { [key: string]: string };
    public readonly fs: FS;
    public readonly pty: PTY;
    public readonly interpreter: CodeInterpreter;
    public readonly commands: Commands;
    public readonly language: SandboxOptions['language'];

    private readonly config: Configuration;
    private readonly execApi: ExecutionApi;
    private readonly sandboxesApi: SandboxesApi;


    constructor(sandbox: Sandbox, config: Configuration) {
        if (!sandbox.id) {
            throw new Error('Sandbox ID is required');
        }
        if (!sandbox.name) {
            throw new Error('Sandbox name is required');
        }
        if (!sandbox.cpu) {
            throw new Error('Sandbox CPU is required');
        }
        if (!sandbox.mem) {
            throw new Error('Sandbox memory is required');
        }
        if (!sandbox.orgId) {
            throw new Error('Sandbox organization ID is required');
        }
        if (!sandbox.createdAt) {
            throw new Error('Sandbox created at is required');
        }
        if (!sandbox.createdBy) {
            throw new Error('Sandbox created by is required');
        }
        if (!sandbox.status) {
            throw new Error('Sandbox status is required');
        }

        this.id = sandbox.id;
        this.name = sandbox.name;
        this.cpu = sandbox.cpu;
        this.mem = sandbox.mem;
        this.orgId = sandbox.orgId;
        this.createdAt = sandbox.createdAt;
        this.createdBy = sandbox.createdBy;
        this.status = sandbox.status;
        this.envVars = sandbox.envVars;
        this.config = config;
        this.fs = new FS(sandbox.id, config);
        this.pty = new PTY(sandbox.id, config);
        this.interpreter = new CodeInterpreter(sandbox.id, config);
        this.commands = new Commands(sandbox.id, config);
        this.execApi = new ExecutionApi(this.config);
        this.sandboxesApi = new SandboxesApi(this.config);
    }

    async remove() {
        await wrapRequest(this.sandboxesApi.deleteSandbox({
            id: this.id
        }));
    }

    async info() {
        return this;
    }

    async exec(execRequest: ExecRequest, handlers?: ExecStreamHandlers) {
        // If streaming handlers are provided, use streaming mode
        if (handlers?.onStdout || handlers?.onStderr || handlers?.onExit) {
            return await this._execStream(execRequest, handlers);
        }

        // Otherwise, use regular synchronous execution
        return await wrapRequest(this.execApi.execCommand({
            id: this.id,
            execRequest: execRequest
        }));
    }

    private async _execStream(execRequest: ExecRequest, handlers: ExecStreamHandlers = {}): Promise<void> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        };

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.id}/exec-stream`;
        const response = await fetchApi(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(execRequest),
            signal: handlers.signal
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Exec stream failed with status ${response.status}`);
        }

        if (!response.body) {
            throw new Error('Exec stream response has no body');
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
                    const parsed = JSON.parse(data) as ExecStreamExit;
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

    async execStream(execRequest: ExecRequest, handlers: ExecStreamHandlers = {}): Promise<void> {
        return this._execStream(execRequest, handlers);
    }

    async runCode(code: string, options?: CodeExecutionOptions): Promise<CodeExecutionResult> {
        return this.interpreter.runCode(code, options);
    }
}
