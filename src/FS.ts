import { Configuration, ExecResponse, FileSystemApi, StartWatchRequest } from "./api-client/index.js";
import { wrapRequest } from "./utils/runtime.js";
import { FolderSizeResponse, StatFileResponse, FileWatchOptions } from "./types.js";
import { FileWatcher } from "./FileWatcher.js";


/**
 * Detect the JavaScript runtime environment
 */
function detectRuntime(): 'node' | 'deno' | 'bun' | 'unknown' {
    const globalThisAny = globalThis as any;

    // Deno
    if (typeof globalThisAny.Deno !== 'undefined' && globalThisAny.Deno?.version) {
        return 'deno';
    }

    // Bun
    if (typeof globalThisAny.Bun !== 'undefined') {
        return 'bun';
    }

    // Node.js
    if (typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null) {
        return 'node';
    }

    return 'unknown';
}

export class FS {
    private readonly fsApi: FileSystemApi;

    constructor(private readonly sandboxId: string, private readonly config: Configuration) {
        this.fsApi = new FileSystemApi(config);
    }

    async listFiles(path: string) {
        // Use raw API to handle non-standard response format
        const result = await wrapRequest(this.fsApi.listFiles({
            id: this.sandboxId,
            path
        }));


        return result;
    }

    /**
     * Download a file and return the full response (non-streaming)
     */
    async downloadFile(path: string) {
        const response = await wrapRequest(this.fsApi.downloadFile({
            id: this.sandboxId,
            path
        }));
        // save blob to file must be compatible with all platforms
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer;
    }

    /**
     * Download a file as a streaming ReadableStream
     * Works across browser, Node.js, Deno, Bun, and serverless environments
     * 
     * @param path - Path to the file to download
     * @returns A ReadableStream that can be consumed progressively
     * 
     * @example
     * ```ts
     * const stream = await fs.downloadFileStream('/path/to/file.txt');
     * const reader = stream.getReader();
     * while (true) {
     *   const { done, value } = await reader.read();
     *   if (done) break;
     *   // Process chunk: value is a Uint8Array
     * }
     * ```
     */
    async downloadFileStream(path: string): Promise<ReadableStream<Uint8Array>> {
        const apiResponse = await this.fsApi.downloadFileRaw({
            id: this.sandboxId,
            path
        });

        // Access the raw Response from BlobApiResponse
        const response = (apiResponse as any).raw as Response;

        // Response.body is a ReadableStream in all modern runtimes
        if (!response.body) {
            throw new Error('Response body is null');
        }

        return response.body;
    }

    /**
     * Upload a file (non-streaming, accepts string content)
     * For streaming support, use uploadFileStream() or uploadFileFromSource()
     */
    async uploadFile(path: string, content: string) {
        return this.uploadFileFromSource(path, content);
    }

    /**
     * Upload a file with true streaming support (ReadableStream)
     * Works across browser, Node.js, Deno, Bun, and serverless environments
     * 
     * This method streams data directly without buffering the entire file in memory,
     * making it suitable for large files.
     * 
     * @param path - Destination path for the file
     * @param stream - ReadableStream to upload
     * @param contentType - Optional MIME type (defaults to 'application/octet-stream')
     * @returns Upload response
     * 
     * @example
     * ```ts
     * // Create a streaming source
     * const stream = new ReadableStream({
     *   start(controller) {
     *     // Enqueue chunks as they become available
     *     controller.enqueue(new Uint8Array([1, 2, 3]));
     *     controller.close();
     *   }
     * });
     * await fs.uploadFileStream('/path/to/file.txt', stream);
     * 
     * // From a File.stream() (browser)
     * const fileInput = document.querySelector('input[type="file"]');
     * const fileStream = fileInput.files[0].stream();
     * await fs.uploadFileStream('/path/to/file.txt', fileStream);
     * ```
     */
    async uploadFileStream(
        path: string,
        stream: ReadableStream<Uint8Array>,
        contentType: string = 'application/octet-stream'
    ) {
        // Use uploadFileRaw with initOverrides to pass the ReadableStream directly
        // This enables true streaming without buffering
        const response = await this.fsApi.uploadFileRaw(
            {
                id: this.sandboxId,
                path,
                body: new Blob([]) // Dummy blob to satisfy type requirement
            },
            async (requestContext) => {
                return {
                    ...requestContext.init,
                    body: stream, // Override with the actual stream
                    // @ts-ignore - duplex is required for streaming in Node.js fetch
                    duplex: 'half', // Required for Node.js fetch API with streams
                    headers: {
                        ...requestContext.init.headers,
                        'Content-Type': contentType
                    }
                };
            }
        );

        // Extract the raw Response object and handle text response
        const rawResponse = (response as any).raw as Response;
        if (!rawResponse.ok) {
            const errorText = await rawResponse.text();
            throw new Error(`Upload stream failed: ${errorText}`);
        }

        const responseText = await rawResponse.text();
        return {
            status: 'success',
            message: responseText || 'File uploaded successfully'
        };
    }

    /**
     * Upload a file from a local file path (Node.js, Deno, Bun, Serverless)
     * Streams the file directly without loading it into memory, suitable for large files.
     * 
     * Supported runtimes:
     * - Node.js: Uses fs.createReadStream()
     * - Deno: Uses Deno.open().readable
     * - Bun: Uses Bun.file().stream()
     * - Serverless (Node.js-based): Works with files in /tmp directory
     * 
     * Serverless limitations:
     * - AWS Lambda: Only /tmp directory is writable (512 MB default, up to 10 GB)
     * - Vercel Functions: Only /tmp directory is writable
     * - Cloudflare Workers: Not supported (no file system access)
     * - Edge runtimes: Not supported (no file system access)
     * 
     * Note: In serverless environments, files must be in /tmp or the function
     * will fail with permission errors. Files in /tmp are ephemeral and only
     * available during the function execution.
     * 
     * @param remotePath - Destination path on the remote sandbox
     * @param localPath - Local file system path to the file to upload
     * @param contentType - Optional MIME type (defaults to 'application/octet-stream')
     * @returns Upload response
     * 
     * @throws Error if not running in a supported runtime (Node.js, Deno, or Bun)
     * @throws Error if file is not found or not accessible
     * 
     * @example
     * ```ts
     * // Upload a large file from local filesystem (works in Node.js, Deno, Bun)
     * await fs.uploadFileFromPath('/remote/path/to/file.txt', './local/file.txt');
     * 
     * // Upload with specific content type
     * await fs.uploadFileFromPath('/remote/image.png', './local/image.png', 'image/png');
     * 
     * // Serverless example (AWS Lambda / Vercel) - file must be in /tmp
     * await fs.uploadFileFromPath('/remote/data.json', '/tmp/data.json');
     * ```
     */
    async uploadFileFromPath(
        remotePath: string,
        localPath: string,
        contentType: string = 'application/octet-stream'
    ) {
        const runtime = detectRuntime();
        let webStream: ReadableStream<Uint8Array>;

        switch (runtime) {
            case 'node': {
                // Node.js: Use fs.createReadStream and convert to Web Stream
                const { createReadStream } = await import('fs');
                const { Readable } = await import('stream');
                const { stat } = await import('fs/promises');

                // Check if file exists
                try {
                    await stat(localPath);
                } catch (error: any) {
                    if (error.code === 'ENOENT') {
                        throw new Error(`File not found: ${localPath}`);
                    }
                    throw error;
                }

                // Create Node.js readable stream from file
                const nodeStream = createReadStream(localPath);
                // Convert Node.js stream to Web ReadableStream (Node.js 17+)
                webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;
                break;
            }

            case 'deno': {
                // Deno: Use Deno.open() to get a readable stream
                const globalThisAny = globalThis as any;
                const Deno = globalThisAny.Deno;

                try {
                    // Open file and get readable stream
                    const file = await Deno.open(localPath, { read: true });
                    webStream = file.readable;
                } catch (error: any) {
                    if (error.name === 'NotFound') {
                        throw new Error(`File not found: ${localPath}`);
                    }
                    throw error;
                }
                break;
            }

            case 'bun': {
                // Bun: Use Bun.file() to get a stream
                const globalThisAny = globalThis as any;
                const Bun = globalThisAny.Bun;

                try {
                    const file = Bun.file(localPath);
                    // Check if file exists by trying to get its size
                    const exists = await file.exists();
                    if (!exists) {
                        throw new Error(`File not found: ${localPath}`);
                    }
                    // Get the stream
                    webStream = await file.stream();
                } catch (error: any) {
                    if (error.message?.includes('not found') || error.message?.includes('ENOENT')) {
                        throw new Error(`File not found: ${localPath}`);
                    }
                    throw error;
                }
                break;
            }

            default:
                throw new Error(
                    'uploadFileFromPath() is only available in Node.js, Deno, or Bun runtimes. ' +
                    'Use uploadFileStream() with a ReadableStream in other runtimes (e.g., browser).'
                );
        }

        // Use the existing streaming upload method
        return this.uploadFileStream(remotePath, webStream, contentType);
    }

    /**
     * Upload a file from various source types (convenience method)
     * Works across browser, Node.js, Deno, Bun, and serverless environments
     * 
     * Note: For large files, prefer uploadFileStream() with a ReadableStream
     * to avoid loading the entire file into memory.
     * 
     * @param path - Destination path for the file
     * @param source - Source data: File, Blob, ArrayBuffer, Uint8Array, or string
     * @param contentType - Optional MIME type
     * @returns Upload response
     * 
     * @example
     * ```ts
     * // From a File (browser)
     * const fileInput = document.querySelector('input[type="file"]');
     * await fs.uploadFile('/path/to/file.txt', fileInput.files[0]);
     * 
     * // From a Blob
     * const blob = new Blob(['content']);
     * await fs.uploadFile('/path/to/file.txt', blob);
     * 
     * // From a Uint8Array
     * const data = new Uint8Array([1, 2, 3]);
     * await fs.uploadFile('/path/to/file.txt', data);
     * 
     * // From a string
     * await fs.uploadFile('/path/to/file.txt', 'content');
     * ```
     */
    async uploadFileFromSource(
        path: string,
        source: File | Blob | ArrayBuffer | Uint8Array | string,
        contentType?: string
    ) {
        let body: Blob;

        if (source instanceof File) {
            // File is a subclass of Blob, use directly
            body = source;
        } else if (source instanceof Blob) {
            body = source;
        } else if (source instanceof ArrayBuffer) {
            body = new Blob([source], { type: contentType || 'application/octet-stream' });
        } else if (source instanceof Uint8Array) {
            // Uint8Array is compatible with Blob constructor in all runtimes
            // Cast to any to avoid strict type checking issues with ArrayBufferLike vs ArrayBuffer
            body = new Blob([source as any], { type: contentType || 'application/octet-stream' });
        } else if (typeof source === 'string') {
            body = new Blob([source], { type: contentType || 'text/plain' });
        } else {
            throw new Error(`Unsupported source type: ${typeof source}`);
        }

        // uploadFile returns plain text response, use Raw API
        const rawResponse = await this.fsApi.uploadFileRaw({
            id: this.sandboxId,
            path,
            body
        });

        // Extract the raw Response object
        const response = (rawResponse as any).raw as Response;

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed: ${errorText}`);
        }

        // Return a normalized success response
        const responseText = await response.text();
        return {
            status: 'success',
            message: responseText || 'File uploaded successfully'
        };
    }

    async deleteFile(path: string) {
        return wrapRequest(this.fsApi.deleteFile({
            id: this.sandboxId,
            path
        }));
    }

    async createDirectory(path: string) {
        return wrapRequest(this.fsApi.createDirectory({
            id: this.sandboxId,
            path
        }));
    }

    async createFile(path: string) {
        return wrapRequest(this.fsApi.createFile({
            id: this.sandboxId,
            path
        }));
    }

    async moveFile(from: string, to: string) {
        return wrapRequest(this.fsApi.moveFile({
            id: this.sandboxId,
            from,
            to
        }));
    }

    async copyFile(from: string, to: string) {
        return wrapRequest(this.fsApi.copyFile({
            id: this.sandboxId,
            from,
            to
        }));
    }

    async changePermissions(path: string, mode: string) {
        return wrapRequest(this.fsApi.changePermissions({
            id: this.sandboxId,
            path,
            mode
        }));
    }

    async compressFile(path: string, format: 'tar' | 'tar.gz' | 'tar.bz2' | 'zip' = 'tar.gz') {

        const response = await wrapRequest(this.fsApi.compressFile({
            id: this.sandboxId,
            path,
            format
        }));

        // Backend executes tar/zip command but doesn't return the archive path
        // Construct it based on the source path and format
        const cleanPath = path.startsWith('/') ? path : '/' + path;
        let archivePath: string;

        switch (format) {
            case 'tar':
                archivePath = `${cleanPath}.tar`;
                break;
            case 'tar.gz':
                archivePath = `${cleanPath}.tar.gz`;
                break;
            case 'tar.bz2':
                archivePath = `${cleanPath}.tar.bz2`;
                break;
            case 'zip':
                archivePath = `${cleanPath}.zip`;
                break;
            default:
                archivePath = `${cleanPath}.tar.gz`;
        }

        return { archivePath, ...response };
    }


    async statFile(path: string) {
        const result = await wrapRequest(this.fsApi.statFile({
            id: this.sandboxId,
            path
        }));

        let info: StatFileResponse = {} as StatFileResponse;
        if (result?.data?.stdout) {
            try {
                info = JSON.parse(result.data.stdout.trim()) as StatFileResponse;
            } catch (e) {
                info = {} as StatFileResponse
            }
        }

        return { info, ...result };
    }

    async searchFiles(path: string, pattern: string = "*") {

        const result = await wrapRequest(this.fsApi.searchFiles({
            id: this.sandboxId,
            path,
            pattern
        }));

        let paths: string[] = [];
        if (result?.data?.stdout) {
            paths = result.data.stdout
                .split(/\r?\n/)
                .map((line: string) => line.trim())
                .filter((line: string) => line.length > 0);
        }

        return { paths, ...result };
    }

    async headTail(path: string, options?: { lines?: number; head?: boolean }) {
        const lines = options?.lines ?? 10;
        const head = options?.head ?? true;

        const result = await wrapRequest(this.fsApi.headTail({
            id: this.sandboxId,
            path,
            lines,
            head
        }));

        // Backend returns {status, message, data: {stdout: "...", exitCode: 0}}
        let content: string[] = [];
        if (result?.data?.stdout) {
            const text = String(result.data.stdout);
            content = text
                .split(/\r?\n/)
                .map((l: string) => l.trimEnd())
                .filter((l: string) => l.length > 0);
        }

        return { content, ...result };
    }

    async extractArchive(archivePath: string, destPath?: string) {
        return wrapRequest(this.fsApi.extractArchive({
            id: this.sandboxId,
            archive: archivePath,
            dest: destPath || "/tmp"
        }));
    }

    async folderSize(path: string) {
        const result = await wrapRequest(this.fsApi.diskUsage({
            id: this.sandboxId,
            path
        }));
        // Backend returns {status, message, data: {stdout: "4.0K\t/tmp/fs-e2e", exitCode: 0}}
        // Parse the du output from stdout (format: "SIZE\tPATH")

        let info: FolderSizeResponse = {} as FolderSizeResponse;
        if (result?.data?.stdout) {
            const output = result.data.stdout.trim();
            const parts = output.split(/\s+/);
            if (parts.length >= 2) {
                const rawSize = parts[0];
                info.size = Number(rawSize.replace(/[KMG]$/, ''));
                if (rawSize.endsWith('K')) info.unit = 'KB';
                else if (rawSize.endsWith('M')) info.unit = 'MB';
                else if (rawSize.endsWith('G')) info.unit = 'GB';
                else info.unit = 'KB'; // Default to KB if no suffix (du -h usually adds it)
            }
        }

        return { info, ...result };
    }

    /**
     * Watch a directory for changes
     * 
     * @param path Directory path to watch
     * @param options Watch options
     * @returns A FileWatcher instance
     */
    async watch(path: string, options: FileWatchOptions): Promise<FileWatcher> {
        const response = await wrapRequest(this.fsApi.startWatch({
            id: this.sandboxId,
            startWatchRequest: {
                path,
                recursive: options.recursive ?? true,
                ignoreHidden: options.ignoreHidden ?? true
            }
        }));

        const sessionId = response.data?.sessionId;
        if (!sessionId) {
            throw new Error('Failed to start watch session: No sessionId returned');
        }

        const watcher = new FileWatcher(this.sandboxId, sessionId, this.config, options);
        await watcher.connect();
        return watcher;
    }
}
