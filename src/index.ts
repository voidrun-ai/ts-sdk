import { CreateSandbox201Response, Sandbox as SandboxModel, SandboxesApi, Configuration, ApiResponseSandbox, ApiResponseSandboxesList, ExecutionApi, Sandbox } from './api-client/index.js';
import { constants } from "./constants.js";
import VRSandbox from "./Sandbox.js";
import { wrapRequest } from "./utils/runtime.js";
import { SandboxOptions, VoidRunConfig } from "./types.js";

// Export filesystem types
export type { FileEntry } from "./types.js";

// export { Sandbox };
export { PTY } from "./PTY.js";
export { PtySession } from "./PtySession.js";
export { FileWatcher } from "./FileWatcher.js";
export { CodeInterpreter } from "./CodeInterpreter.js";
export { Commands } from "./Commands.js";
export type { PtyOptions, PtyResize, PtySessionInfo, FileWatchOptions, FileChangeEvent, ExecStreamHandlers, ExecStreamExit } from "./types.js";
export type { SupportedLanguage, CodeExecutionOptions, CodeExecutionResult } from "./CodeInterpreter.js";
export type { ProcessInfo, CommandRunResponse, CommandListResponse, CommandKillResponse, CommandWaitResponse, ProcessAttachHandlers } from "./Commands.js";

export class VoidRun {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly orgId: string;
    private readonly config: Configuration;
    private readonly sandboxesApi: SandboxesApi;


    constructor({ apiKey, baseUrl, orgId }: VoidRunConfig) {
        this.apiKey = apiKey || constants.apiKey || '';
        this.baseUrl = baseUrl || constants.apiUrl || '';
        this.orgId = orgId || '';


        if (!this.apiKey) {
            throw new Error('API key is required');
        }
        if (!this.baseUrl) {
            throw new Error('Base URL is required');
        }

        this.config = new Configuration({
            basePath: this.baseUrl,
            apiKey: this.apiKey
        });


        this.sandboxesApi = new SandboxesApi(this.config);
    }


    async createSandbox(options: SandboxOptions) {
        const { name, cpu, mem, orgId, language, templateId, sync, userId } = options;

        const response = await wrapRequest<CreateSandbox201Response>(this.sandboxesApi.createSandbox({
            createSandboxRequest: {
                name: name || 'sdbx-' + Date.now(),
                templateId: templateId || constants.defaultTemplateId,
                cpu: cpu || constants.defaultSandboxCpu,
                mem: mem || constants.defaultSandboxMem,
                orgId: orgId || '',
                sync: sync ?? true,
                userId: userId || ''
            }
        }));

        console.log(response.message);

        return new VRSandbox(response.data as SandboxModel, this.config);
    }

    async getSandbox(id: string) {
        const response = await wrapRequest<ApiResponseSandbox>(this.sandboxesApi.getSandbox({
            id: id
        }));

        return new VRSandbox(response.data as SandboxModel, this.config);
    }

    async listSandboxes() {
        const response = await wrapRequest<ApiResponseSandboxesList>(this.sandboxesApi.listSandboxes());
        return {
            sandboxes: response?.data?.map((s: Sandbox) => new VRSandbox(s, this.config)) ?? [],
            meta: response?.meta ?? { total: 0, page: 1, limit: 50, totalPages: 0 }
        }
    }

    async removeSandbox(id: string) {
        await wrapRequest(this.sandboxesApi.deleteSandbox({
            id: id
        }));
    }
}