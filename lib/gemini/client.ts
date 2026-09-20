/**
 * Server-side client for the Cloudflare Gemini Worker.
 * GEMINI_API_KEY stays on the Worker (`wrangler secret put GEMINI_API_KEY`).
 * This client only needs GEMINI_WORKER_URL + GEMINI_WORKER_SECRET.
 */

import { GEMINI_WORKER_PATHS } from "./types";
import type {
  GeminiGenerateRequest,
  GeminiGroundedRequest,
  GeminiHealthResponse,
  GeminiListingMediaRequest,
  GeminiSuccessResponse,
} from "./types";

export type GeminiWorkerClientConfig = {
  workerUrl: string;
  workerSecret: string;
  fetchImpl?: typeof fetch;
};

export class GeminiWorkerClient {
  private readonly workerUrl: string;
  private readonly workerSecret: string;
  private readonly fetchImpl: typeof fetch;

  constructor(config: GeminiWorkerClientConfig) {
    this.workerUrl = config.workerUrl.replace(/\/$/, "");
    this.workerSecret = config.workerSecret;
    this.fetchImpl = config.fetchImpl ?? fetch;
  }

  async health(): Promise<GeminiHealthResponse> {
    return this.request<GeminiHealthResponse>(GEMINI_WORKER_PATHS.health, {
      method: "GET",
    });
  }

  async generate(body: GeminiGenerateRequest): Promise<GeminiSuccessResponse> {
    return this.request<GeminiSuccessResponse>(GEMINI_WORKER_PATHS.generate, {
      method: "POST",
      body,
    });
  }

  async draftGrounded(
    body: GeminiGroundedRequest,
  ): Promise<GeminiSuccessResponse> {
    return this.request<GeminiSuccessResponse>(GEMINI_WORKER_PATHS.grounded, {
      method: "POST",
      body,
    });
  }

  async describeListingMedia(
    body: GeminiListingMediaRequest,
  ): Promise<GeminiSuccessResponse> {
    return this.request<GeminiSuccessResponse>(
      GEMINI_WORKER_PATHS.listingMedia,
      {
        method: "POST",
        body,
      },
    );
  }

  private async request<T>(
    path: string,
    options: { method: "GET" | "POST"; body?: unknown },
  ): Promise<T> {
    if (!this.workerUrl) {
      throw new Error(
        "GEMINI_WORKER_URL is not set. Deploy the Worker and point this client at it.",
      );
    }
    if (!this.workerSecret) {
      throw new Error(
        "GEMINI_WORKER_SECRET is not set. Use the same value as `wrangler secret put GEMINI_WORKER_SECRET`.",
      );
    }

    const response = await this.fetchImpl(`${this.workerUrl}${path}`, {
      method: options.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.workerSecret}`,
        ...(options.body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const payload = (await response.json()) as T & {
      ok?: boolean;
      error?: string;
    };

    if (!response.ok || payload.ok === false) {
      const message =
        typeof payload.error === "string"
          ? payload.error
          : `Gemini Worker error (${response.status})`;
      throw new Error(message);
    }

    return payload;
  }
}

export function getGeminiWorkerClient(): GeminiWorkerClient {
  return new GeminiWorkerClient({
    workerUrl: process.env.GEMINI_WORKER_URL ?? "",
    workerSecret: process.env.GEMINI_WORKER_SECRET ?? "",
  });
}
