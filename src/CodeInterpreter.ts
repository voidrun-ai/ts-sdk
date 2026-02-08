import { Configuration, ExecutionApi, ExecRequest } from './api-client/index.js';
import { wrapRequest } from './utils/runtime.js';

export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'node' | 'bash' | 'sh';

export interface CodeExecutionOptions {
    language?: SupportedLanguage;
    timeout?: number;
    cwd?: string;
    env?: Record<string, string>;
    onStdout?: (data: string) => void;
    onStderr?: (data: string) => void;
    onError?: (error: Error) => void;
}

export interface CodeExecutionResult {
    success: boolean;
    results: any;
    stdout: string;
    stderr: string;
    error?: string;
    exitCode?: number;
    logs: {
        stdout: string[];
        stderr: string[];
    };
}

/**
 * CodeInterpreter provides E2B-style code execution API
 * Executes code snippets in different languages with streaming support
 */
export class CodeInterpreter {
    private execApi: ExecutionApi;

    /**
     * @internal
     */
    constructor(
        private sandboxId: string,
        private config: Configuration
    ) {
        this.execApi = new ExecutionApi(config);
    }

    /**
     * Execute code and return results (E2B-style API)
     * @param code The code to execute
     * @param options Execution options including language and handlers
     * @returns Execution result with stdout, stderr, and parsed results
     */
    async runCode(code: string, options: CodeExecutionOptions = {}): Promise<CodeExecutionResult> {
        const language = options.language || 'python';
        const timeout = options.timeout || 60;
            const { onStdout, onStderr, onError } = options;
        
        // Build the execution command based on language
        const { command, tempFile } = this.buildCommand(code, language);
        
        const stdoutLines: string[] = [];
        const stderrLines: string[] = [];
        let exitCode = 0;
        let hasError = false;

        // Use streaming execution if handlers are provided
        if (onStdout || onStderr || onError) {
            await this.executeStreaming(command, timeout, options, stdoutLines, stderrLines);
        } else {
            // Non-streaming execution
            try {
                const result = await wrapRequest(this.execApi.execCommand({
                    id: this.sandboxId,
                    execRequest: {
                        command,
                        timeout,
                        cwd: options.cwd,
                        env: options.env,
                    }
                }));

                if (result.data) {
                    stdoutLines.push(result.data.stdout || '');
                    stderrLines.push(result.data.stderr || '');
                    exitCode = result.data.exitCode || 0;
                }
            } catch (error) {
                hasError = true;
                const errorMsg = error instanceof Error ? error.message : String(error);
                stderrLines.push(errorMsg);
                (options.onError ?? (() => {}))(error instanceof Error ? error : new Error(errorMsg));
            }
        }

        const stdout = stdoutLines.join('');
        const stderr = stderrLines.join('');
        
        // Parse results from stdout
        const results = this.parseResults(stdout, language);

        return {
            success: exitCode === 0 && !hasError,
            results,
            stdout,
            stderr,
            error: stderr || undefined,
            exitCode,
            logs: {
                stdout: stdoutLines,
                stderr: stderrLines,
            }
        };
    }

    /**
     * Execute code with streaming handlers
     */
    private async executeStreaming(
        command: string,
        timeout: number,
        options: CodeExecutionOptions,
        stdoutLines: string[],
        stderrLines: string[]
    ): Promise<void> {
        const fetchApi = this.config.fetchApi ?? fetch;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        };

        if (this.config.apiKey) {
            headers['X-API-Key'] = await this.config.apiKey('X-API-Key');
        }

        const url = `${this.config.basePath}/sandboxes/${this.sandboxId}/exec-stream`;
        const execRequest: ExecRequest = {
            command,
            timeout,
            cwd: options.cwd,
            env: options.env,
        };

        try {
            const response = await fetchApi(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(execRequest),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `Exec failed with status ${response.status}`);
            }

            if (!response.body) {
                throw new Error('Response has no body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

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
                    if (!data) continue;

                    if (event === 'stdout') {
                        stdoutLines.push(data);
                        options.onStdout?.(data);
                    } else if (event === 'stderr') {
                        stderrLines.push(data);
                        options.onStderr?.(data);
                    } else if (event === 'exit') {
                        try {
                            const exitData = JSON.parse(data);
                            // Store exit code if needed
                        } catch (err) {
                            // Ignore parse errors
                        }
                    }
                }
            }
        } catch (error) {
            if (options.onError) {
                options.onError(error instanceof Error ? error : new Error(String(error)));
            }
            throw error;
        }
    }

    /**
     * Build execution command for the given language
     */
    private buildCommand(code: string, language: SupportedLanguage): { command: string; tempFile?: string } {
        const timestamp = Date.now();
        
        switch (language) {
            case 'python': {
                // For Python, use -c for short snippets, temp file for longer code
                if (code.length < 1000 && !code.includes('\n\n')) {
                    // Escape single quotes and use python -c
                    const escapedCode = code.replace(/'/g, "'\\''");
                    return { command: `python3 -c '${escapedCode}'` };
                } else {
                    // Write to temp file for complex code
                    const tempFile = `/tmp/code_${timestamp}.py`;
                    const writeCmd = `cat > ${tempFile} << 'EOFPYTHON'\n${code}\nEOFPYTHON`;
                    return { 
                        command: `${writeCmd} && python3 ${tempFile} && rm -f ${tempFile}`,
                        tempFile 
                    };
                }
            }
            
            case 'javascript':
            case 'node':
            case 'typescript': {
                const tempFile = `/tmp/code_${timestamp}.js`;
                const writeCmd = `cat > ${tempFile} << 'EOFJS'\n${code}\nEOFJS`;
                return {
                    command: `${writeCmd} && node ${tempFile} && rm -f ${tempFile}`,
                    tempFile
                };
            }
            
            case 'bash':
            case 'sh': {
                const escapedCode = code.replace(/'/g, "'\\''");
                return { command: `bash -c '${escapedCode}'` };
            }
            
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }

    /**
     * Parse execution results from output
     * Tries to extract the last expression result for REPLs
     */
    private parseResults(output: string, language: SupportedLanguage): any {
        if (!output || !output.trim()) {
            return null;
        }

        // For Python/Node REPL-style output, try to get the last value
        const lines = output.trim().split('\n');
        const lastLine = lines[lines.length - 1];

        // Try to parse as JSON first
        try {
            return JSON.parse(lastLine);
        } catch {
            // If not JSON, return the last line or full output
            if (lastLine && lastLine !== 'undefined' && lastLine !== 'None') {
                return lastLine;
            }
            return output.trim();
        }
    }
}
