import { Configuration, CreatePTYSession200Response, ExecutionApi, ListPTYSessions200Response } from "./api-client/index.js";
import { wrapRequest } from "./utils/runtime.js";
import { PtySessionInfo, PtyOptions } from "./types.js";
import { PtySession } from "./PtySession.js";

export class PTY {
    private readonly execApi: ExecutionApi;

    constructor(private readonly sandboxId: string, private readonly config: Configuration) {
        this.execApi = new ExecutionApi(config);
    }

    /**
     * List all active PTY sessions for the sandbox
     */
    async list() {
        return await wrapRequest(this.execApi.listPTYSessions({
            id: this.sandboxId
        }));
    }

    /**
     * Create a new PTY session
     */
    async createSession() {
        return await wrapRequest(this.execApi.createPTYSession({
            id: this.sandboxId
        }));
    }

    /**
     * Delete a PTY session
     */
    async deleteSession(sessionId: string) {
        await wrapRequest(this.execApi.deletePTYSession({
            id: this.sandboxId,
            sessionId: sessionId
        }));
    }

    /**
     * Connect to a PTY session
     */
    async connect(options: PtyOptions) {
        const mode = options.sessionId ? 'persistent' : 'ephemeral';
        const pty = new PtySession(this.sandboxId, this.config, mode, options);
        await pty.connect();
        return pty;
    }
}
