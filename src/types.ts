export type SandboxOptions = {
    name?: string;
    templateId?: string;
    cpu?: number;
    mem?: number;
    orgId?: string;
    userId?: string;
    sync?: boolean;
    language?: 'javascript' | 'typescript' | 'python';
    envVars?: Record<string, string>;
    autoStopAfterMinutes?: number;
    autoDeleteAfterMinutes?: number;
}

export type VoidRunConfig = {
    apiKey?: string;
    baseUrl?: string;
    orgId?: string;
}

/**
 * Represents a file or directory entry
 */
export type FileEntry = {
    /** File or directory name */
    name: string;
    /** Whether this is a directory */
    isDir: boolean;
    /** Size in bytes */
    size: number;
    /** Unix file mode/permissions (e.g., "-rw-r--r--" or "drwxr-xr-x") */
    mode: string;
}

export type ListFilesResponse = {
    status: string;
    message: string;
    data: {
        files: FileEntry[];
    }
}


export type StatFileResponse = {
    path: string;
    size: number;
    mode: number;
    mtime: number;
    type: 'regular empty file' | 'regular file' | 'directory' | 'character special file' | 'block special file' | 'symbolic link' | 'socket file' | 'fifo file';
}

export type FolderSizeResponse = {
    size: number;
    unit: 'MB' | 'GB' | 'KB';
}

export type PtySessionInfo = {
    id: string;
    createdAt: string;
    clients: number;
    alive: boolean;
}
export interface PtyOptions {
    sessionId?: string;
    onData: (data: string) => void;
    onClose?: () => void;
    onError?: (error: Error) => void;
}

export type PtyResize = {
    cols: number;
    rows: number;
}

export type RunCommandOptions = {
    timeout?: number;
    prompt?: string | RegExp;
}

export type ExecStreamExit = {
    exitCode: number;
    error?: string;
}

export type ExecStreamHandlers = {
    onStdout?: (data: string) => void;
    onStderr?: (data: string) => void;
    onExit?: (result: ExecStreamExit) => void;
    onError?: (error: Error) => void;
    signal?: AbortSignal;
}

export type FileWatchOptions = {
    recursive?: boolean;
    ignoreHidden?: boolean;
    onEvent: (event: FileChangeEvent) => void;
    onError?: (error: Error) => void;
}

export interface FileChangeEvent {
    type: 'create' | 'write' | 'remove' | 'rename' | 'chmod' | string;
    path: string;
}
