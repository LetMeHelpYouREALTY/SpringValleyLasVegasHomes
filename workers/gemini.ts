/**
 * Cloudflare Worker — Gemini Developer API (direct fetch).
 *
 * Secret: `pnpm cloudflare:secret:gemini` → wrangler secret put GEMINI_API_KEY
 * Caller auth: wrangler secret put GEMINI_WORKER_SECRET
 *
 * Per Gemini generateContent docs (Sept 2026):
 * POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
 * Header: x-goog-api-key
 * Search grounding: tools: [{ google_search: {} }]
 */

import {
  GEMINI_API_BASE,
  GEMINI_MODELS,
  GEMINI_WORKER_PATHS,
  baseSystemInstruction,
  buildGroundedUserPrompt,
  buildListingMediaUserPrompt,
  calculateGeminiCost,
  defaultMaxOutputTokens,
  extractGeminiText,
  extractSearchQueries,
  extractSources,
  extractUsage,
  flagFairHousingRisks,
  groundedSystemInstruction,
  isGeminiModelId,
  listingMediaSystemInstruction,
  listingMediaTaskToGeminiTask,
  selectGeminiModel,
  selectThinkingLevel,
} from "../lib/gemini";
import type {
  GeminiGenerateContentResponse,
  GeminiGenerateRequest,
  GeminiGroundedRequest,
  GeminiListingMediaRequest,
  GeminiMediaInput,
  GeminiSuccessResponse,
  GeminiTask,
  GeminiWorkerEnv,
} from "../lib/gemini";

const MAX_JSON_BODY_BYTES = 12 * 1024 * 1024;
const MAX_REMOTE_MEDIA_BYTES = 8 * 1024 * 1024;
const ALLOWED_MEDIA_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

export default {
  async fetch(
    request: Request,
    env: GeminiWorkerEnv,
    ctx: WorkerExecutionContext,
  ): Promise<Response> {
    const response = await handleGeminiRequest(request, env);
    ctx.waitUntil(
      recordGeminiAnalytics(request, response, env).catch((error) => {
        console.error("Gemini analytics error:", error);
      }),
    );
    return response;
  },
};

export async function handleGeminiRequest(
  request: Request,
  env: GeminiWorkerEnv,
): Promise<Response> {
  const url = new URL(request.url);
  const path = normalizePath(url.pathname);

  if (request.method === "GET" && path === GEMINI_WORKER_PATHS.health) {
    return jsonResponse(200, {
      ok: true,
      service: "gemini-worker",
      geminiConfigured: Boolean(env.GEMINI_API_KEY),
      models: {
        bulk: GEMINI_MODELS.flashLite,
        content: GEMINI_MODELS.flash,
        reasoning: GEMINI_MODELS.pro,
      },
    });
  }

  if (request.method !== "POST") {
    return errorResponse(405, "Method not allowed");
  }

  const authError = await authorizeCaller(request, env);
  if (authError) {
    return authError;
  }

  if (!env.GEMINI_API_KEY) {
    return errorResponse(
      503,
      "GEMINI_API_KEY is not set. Run: wrangler secret put GEMINI_API_KEY",
    );
  }

  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader) {
    const length = Number(lengthHeader);
    if (Number.isFinite(length) && length > MAX_JSON_BODY_BYTES) {
      return errorResponse(413, "Request body exceeds 12MB limit");
    }
  }

  try {
    switch (path) {
      case GEMINI_WORKER_PATHS.generate:
        return await handleGenerate(request, env);
      case GEMINI_WORKER_PATHS.grounded:
        return await handleGrounded(request, env);
      case GEMINI_WORKER_PATHS.listingMedia:
        return await handleListingMedia(request, env);
      default:
        return errorResponse(404, "Unknown Gemini route");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gemini error";
    console.error(
      JSON.stringify({
        type: "gemini_worker_error",
        message,
      }),
    );
    return errorResponse(500, message);
  }
}

async function handleGenerate(
  request: Request,
  env: GeminiWorkerEnv,
): Promise<Response> {
  const body = (await request.json()) as GeminiGenerateRequest;
  if (!body?.prompt || typeof body.prompt !== "string") {
    return errorResponse(400, "prompt is required");
  }

  const task: GeminiTask = body.task ?? "content";
  return callGemini(env, {
    task,
    model: resolveModel(body.model, task),
    prompt: body.prompt,
    systemInstruction: body.systemInstruction || baseSystemInstruction(),
    grounded: Boolean(body.grounded),
    thinkingLevel: body.thinkingLevel ?? selectThinkingLevel(task),
    maxOutputTokens: body.maxOutputTokens ?? defaultMaxOutputTokens(task),
    media: body.media,
  });
}

async function handleGrounded(
  request: Request,
  env: GeminiWorkerEnv,
): Promise<Response> {
  const body = (await request.json()) as GeminiGroundedRequest;
  if (!body?.kind || !body.topic?.trim()) {
    return errorResponse(400, "kind and topic are required");
  }

  const task: GeminiTask = "grounded";
  return callGemini(env, {
    task,
    model: resolveModel(body.model, task),
    prompt: buildGroundedUserPrompt(body),
    systemInstruction: groundedSystemInstruction(body.kind),
    grounded: true,
    thinkingLevel: selectThinkingLevel(task),
    maxOutputTokens: defaultMaxOutputTokens(task),
  });
}

async function handleListingMedia(
  request: Request,
  env: GeminiWorkerEnv,
): Promise<Response> {
  const body = (await request.json()) as GeminiListingMediaRequest;
  if (!body?.mediaTask || !Array.isArray(body.media) || body.media.length < 1) {
    return errorResponse(
      400,
      "mediaTask and at least one media item are required",
    );
  }

  const task = listingMediaTaskToGeminiTask(body.mediaTask);
  return callGemini(env, {
    task,
    model: resolveModel(body.model, task),
    prompt: buildListingMediaUserPrompt(body),
    systemInstruction: listingMediaSystemInstruction(body.mediaTask),
    grounded: false,
    thinkingLevel: selectThinkingLevel(task),
    maxOutputTokens: defaultMaxOutputTokens(task),
    media: body.media,
  });
}

type GeminiCallInput = {
  task: GeminiTask;
  model: ReturnType<typeof selectGeminiModel>;
  prompt: string;
  systemInstruction: string;
  grounded: boolean;
  thinkingLevel: ReturnType<typeof selectThinkingLevel>;
  maxOutputTokens: number;
  media?: GeminiMediaInput[];
};

async function callGemini(
  env: GeminiWorkerEnv,
  input: GeminiCallInput,
): Promise<Response> {
  const parts = await buildUserParts(input.prompt, input.media);
  const payload: Record<string, unknown> = {
    systemInstruction: {
      parts: [{ text: input.systemInstruction }],
    },
    contents: [
      {
        role: "user",
        parts,
      },
    ],
    generationConfig: {
      maxOutputTokens: input.maxOutputTokens,
      thinkingConfig: { thinkingLevel: input.thinkingLevel },
    },
  };

  if (input.grounded) {
    payload.tools = [{ google_search: {} }];
  }

  const apiBase = (env.GEMINI_API_BASE || GEMINI_API_BASE).replace(/\/$/, "");
  const endpoint = `${apiBase}/v1beta/models/${input.model}:generateContent`;

  const geminiResponse = await fetchGeminiWithRetry(
    endpoint,
    env.GEMINI_API_KEY!,
    payload,
  );
  const geminiJson =
    (await geminiResponse.json()) as GeminiGenerateContentResponse;

  if (!geminiResponse.ok || geminiJson.error) {
    const message =
      geminiJson.error?.message ||
      `Gemini API error (${geminiResponse.status})`;
    return errorResponse(
      geminiResponse.status >= 400 ? geminiResponse.status : 502,
      message,
    );
  }

  const text = extractGeminiText(geminiJson);
  const searchQueries = extractSearchQueries(geminiJson);
  const usage = extractUsage(geminiJson);
  const cost = calculateGeminiCost(input.model, usage, searchQueries.length);

  const result: GeminiSuccessResponse = {
    ok: true,
    text,
    model: input.model,
    task: input.task,
    grounded: input.grounded,
    sources: extractSources(geminiJson),
    searchQueries,
    usage,
    cost,
    fairHousingFlags: flagFairHousingRisks(text),
  };

  console.log(
    JSON.stringify({
      type: "gemini_request",
      task: input.task,
      model: input.model,
      grounded: input.grounded,
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
      estimatedCostUsd: Number(cost.total.toFixed(6)),
      searchQueries: searchQueries.length,
    }),
  );

  return jsonResponse(200, result);
}

async function fetchGeminiWithRetry(
  endpoint: string,
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<Response> {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  };

  const first = await fetch(endpoint, init);
  if (first.status !== 429) {
    return first;
  }

  const retryAfter = Number(first.headers.get("retry-after") || "1");
  const waitMs = Number.isFinite(retryAfter)
    ? Math.min(Math.max(retryAfter, 1), 8) * 1000
    : 1000;
  await sleep(waitMs);
  return fetch(endpoint, init);
}

async function buildUserParts(
  prompt: string,
  media?: GeminiMediaInput[],
): Promise<Array<Record<string, unknown>>> {
  const parts: Array<Record<string, unknown>> = [{ text: prompt }];
  if (!media?.length) {
    return parts;
  }

  for (const item of media) {
    const mimeType = item.mimeType?.toLowerCase();
    if (!mimeType || !ALLOWED_MEDIA_TYPES.has(mimeType)) {
      throw new Error(`Unsupported media type: ${item.mimeType || "missing"}`);
    }

    if (item.fileUri) {
      parts.push({
        file_data: {
          mime_type: mimeType,
          file_uri: item.fileUri,
        },
      });
      continue;
    }

    if (item.data) {
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: stripDataUrl(item.data),
        },
      });
      continue;
    }

    if (item.url) {
      const remote = await fetchRemoteMedia(item.url, mimeType);
      parts.push({
        inline_data: {
          mime_type: remote.mimeType,
          data: remote.data,
        },
      });
      continue;
    }

    throw new Error("Each media item needs data, url, or fileUri");
  }

  return parts;
}

async function fetchRemoteMedia(
  url: string,
  fallbackMime: string,
): Promise<{ mimeType: string; data: string }> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid media URL");
  }

  if (parsed.protocol !== "https:") {
    throw new Error("Media URLs must be HTTPS");
  }

  const response = await fetch(parsed.toString(), {
    method: "GET",
    headers: { Accept: "image/*,video/*" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch media (${response.status})`);
  }

  const contentLength = Number(response.headers.get("content-length") || "0");
  if (contentLength > MAX_REMOTE_MEDIA_BYTES) {
    throw new Error("Remote media exceeds 8MB limit");
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > MAX_REMOTE_MEDIA_BYTES) {
    throw new Error("Remote media exceeds 8MB limit");
  }

  const mimeType = (response.headers.get("content-type") || fallbackMime)
    .split(";")[0]
    .trim();

  return {
    mimeType,
    data: bytesToBase64(bytes),
  };
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    const slice = bytes.subarray(i, i + chunk);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

function stripDataUrl(value: string): string {
  const match = value.match(/^data:[^;]+;base64,(.+)$/);
  return match?.[1] ?? value;
}

function resolveModel(
  requested: string | undefined,
  task: GeminiTask,
): ReturnType<typeof selectGeminiModel> {
  if (requested && isGeminiModelId(requested)) {
    return requested;
  }
  return selectGeminiModel(task);
}

async function authorizeCaller(
  request: Request,
  env: GeminiWorkerEnv,
): Promise<Response | null> {
  const expected = env.GEMINI_WORKER_SECRET;
  if (!expected) {
    return errorResponse(
      503,
      "GEMINI_WORKER_SECRET is not set. Run: wrangler secret put GEMINI_WORKER_SECRET",
    );
  }

  const header = request.headers.get("authorization") || "";
  const provided = header.startsWith("Bearer ")
    ? header.slice("Bearer ".length)
    : request.headers.get("x-worker-secret") || "";

  if (!timingSafeEqualString(provided, expected)) {
    return errorResponse(401, "Unauthorized");
  }

  return null;
}

export function timingSafeEqualString(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  return crypto.subtle.timingSafeEqual(left, right);
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function errorResponse(status: number, error: string): Response {
  return jsonResponse(status, { ok: false, error, status });
}

async function recordGeminiAnalytics(
  request: Request,
  response: Response,
  env: GeminiWorkerEnv,
): Promise<void> {
  if (!env.ANALYTICS_DATASET) {
    return;
  }

  const url = new URL(request.url);
  env.ANALYTICS_DATASET.writeDataPoint({
    blobs: [url.pathname, request.method, "gemini"],
    doubles: [response.status],
    indexes: [url.pathname],
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
