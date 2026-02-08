
import { Configuration } from './api-client/index.js';
import { FileWatchOptions, FileChangeEvent } from './types.js';
import { WebSocketClient } from './utils/WebSocketClient.js';

export class FileWatcher {
    private client: WebSocketClient | null = null;
    private readonly sandboxId: string;
    private readonly config: Configuration;
    private readonly sessionId: string;
    private readonly options: FileWatchOptions;

    constructor(
        sandboxId: string,
        sessionId: string,
        config: Configuration,
        options: FileWatchOptions
    ) {
        this.sandboxId = sandboxId;
        this.sessionId = sessionId;
        this.config = config;
        this.options = options;
    }

    async connect(): Promise<void> {
        const path = `/sandboxes/${this.sandboxId}/files/watch/${this.sessionId}/stream`;

        this.client = new WebSocketClient(path, this.config, {
            onMessage: (data: any) => {
                try {
                    let text = '';
                    if (typeof data === 'string') {
                        text = data;
                    } else if (Buffer.isBuffer(data)) {
                        text = data.toString('utf-8');
                    } else if (data instanceof ArrayBuffer) {
                        const decoder = new TextDecoder('utf-8');
                        text = decoder.decode(data);
                    } else {
                        text = String(data);
                    }

                    const event = JSON.parse(text) as FileChangeEvent;
                    this.options.onEvent(event);
                } catch (err) {
                    console.error('Failed to parse watch event:', err);
                }
            },
            onError: this.options.onError,
        });

        await this.client.connect();
    }

    close() {
        if (this.client) {
            this.client.close();
            this.client = null;
        }
    }
}
