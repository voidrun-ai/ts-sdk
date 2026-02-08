
import { WebSocket } from 'ws';
import { Configuration } from '../api-client/index.js';

export interface WebSocketClientOptions {
    onMessage: (data: any) => void;
    onClose?: () => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    binaryType?: 'nodebuffer' | 'arraybuffer' | 'fragments';
}

export class WebSocketClient {
    private socket: WebSocket | null = null;
    private readonly url: string;
    private readonly config: Configuration;
    private readonly options: WebSocketClientOptions;
    private isClosed = false;

    constructor(
        url: string,
        config: Configuration,
        options: WebSocketClientOptions
    ) {
        this.url = url;
        this.config = config;
        this.options = options;
    }

    async connect(): Promise<void> {
        if (this.isClosed) return;

        const baseUrl = this.config.basePath;
        const apiKey = this.config.apiKey;

        const wsBase = baseUrl.replace(/^http/, 'ws');

        let keyStr = '';
        if (apiKey) {
            keyStr = await apiKey('X-API-Key');
        }

        // Construct full URL with Base URL + Path + Query Params
        const fullUrl = `${wsBase}${this.url}?apiKey=${encodeURIComponent(keyStr)}`;

        return new Promise((resolve, reject) => {
            try {
                this.socket = new WebSocket(fullUrl);
                if (this.options.binaryType) {
                    this.socket.binaryType = this.options.binaryType;
                }

                this.socket.on('open', () => {
                    if (this.options.onOpen) this.options.onOpen();
                    resolve();
                });

                this.socket.on('message', (data: any) => {
                    // Normalize data if needed, or pass raw data to onMessage
                    this.options.onMessage(data);
                });

                this.socket.on('close', () => {
                    if (this.options.onClose) this.options.onClose();
                });

                this.socket.on('error', (err: any) => {
                    if (this.options.onError) {
                        this.options.onError(err);
                    }
                    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
                        reject(err);
                    }
                });

            } catch (err) {
                reject(err);
            }
        });
    }

    send(data: any) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            throw new Error('WebSocket is not open');
        }
    }

    close() {
        this.isClosed = true;
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
