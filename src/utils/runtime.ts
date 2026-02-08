import { ResponseError } from "../api-client/index.js";

class RuntimeError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export async function wrapRequest<T>(promise: Promise<T>): Promise<T> {
    try {
        const data = await promise;
        return data
    } catch (err: any) {
        if (err instanceof ResponseError) {
            const status = err.response.status;
            const statusText = err.response.statusText || 'HTTP Error';
            let bodyMessage: string | undefined;

            try {
                const errorBody = await err.response.json();
                bodyMessage = errorBody?.error || errorBody?.message;
            } catch {
                try {
                    const errorText = await err.response.text();
                    bodyMessage = errorText?.trim();
                } catch {
                    bodyMessage = undefined;
                }
            }

            const message = bodyMessage
                ? `Request failed (${status} ${statusText}): ${bodyMessage}`
                : `Request failed (${status} ${statusText})`;

            throw new RuntimeError(message);
        }

        // Handle network errors (e.g., server down)
        const fallback = err instanceof Error ? err.message : 'Network or unexpected error';
        throw new RuntimeError(`Network error: ${fallback}`);
    }
}