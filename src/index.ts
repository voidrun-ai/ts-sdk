import {
  type ApiResponseSandbox,
  type ApiResponseSandboxesList,
  Configuration,
  type CreateSandbox201Response,
  ExecutionApi,
  type Sandbox,
  SandboxesApi,
  type Sandbox as SandboxModel,
} from './api-client/index.js';
import { constants } from './constants.js';
import VRSandbox from './Sandbox.js';
import type { SandboxOptions, VoidRunConfig } from './types.js';
import { wrapRequest } from './utils/runtime.js';

export type {
  CodeExecutionOptions,
  CodeExecutionResult,
  SupportedLanguage,
} from './CodeInterpreter.js';
export { CodeInterpreter } from './CodeInterpreter.js';
export type {
  CommandKillResponse,
  CommandListResponse,
  CommandRunResponse,
  CommandWaitResponse,
  ProcessAttachHandlers,
  ProcessInfo,
} from './Commands.js';
export { Commands } from './Commands.js';
export { FileWatcher } from './FileWatcher.js';
// export { Sandbox };
export { PTY } from './PTY.js';
export { PtySession } from './PtySession.js';
// Export filesystem types
export type {
  ExecStreamExit,
  ExecStreamHandlers,
  FileChangeEvent,
  FileEntry,
  FileWatchOptions,
  PtyOptions,
  PtyResize,
  PtySessionInfo,
} from './types.js';

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
      apiKey: this.apiKey,
    });

    this.sandboxesApi = new SandboxesApi(this.config);
  }

  async createSandbox(options: SandboxOptions) {
    const {
      name,
      cpu,
      mem,
      orgId,
      image,
      sync,
      userId,
      envVars,
      autoSleep,
      region,
      refId,
    } = options;

    const response = await wrapRequest<CreateSandbox201Response>(
      this.sandboxesApi.createSandbox({
        createSandboxRequest: {
          name: name || 'sdbx-' + Date.now(),
          image: image || constants.defaultTemplateId,
          cpu: cpu || constants.defaultSandboxCpu,
          mem: mem || constants.defaultSandboxMem,
          orgId: orgId || '',
          sync: sync ?? true,
          userId: userId || '',
          envVars: envVars,
          autoSleep: autoSleep,
          region: region,
          refId: refId,
        },
      }),
    );

    return new VRSandbox(response.data as SandboxModel, this.config);
  }

  async getSandbox(id: string) {
    const response = await wrapRequest<ApiResponseSandbox>(
      this.sandboxesApi.getSandbox({
        id: id,
      }),
    );

    return new VRSandbox(response.data as SandboxModel, this.config);
  }

  async listSandboxes(options: { page?: number; limit?: number } = {}) {
    const response = await wrapRequest<ApiResponseSandboxesList>(
      this.sandboxesApi.listSandboxes({
        page: options.page,
        limit: options.limit,
      }),
    );
    return {
      sandboxes:
        response?.data?.map((s: Sandbox) => new VRSandbox(s, this.config)) ??
        [],
      meta: response?.meta ?? { total: 0, page: 1, limit: 50, totalPages: 0 },
    };
  }

  async removeSandbox(id: string) {
    await wrapRequest(
      this.sandboxesApi.deleteSandbox({
        id: id,
      }),
    );
  }
}
