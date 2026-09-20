import { afterEach, describe, expect, it, vi } from "vitest";
import { handleGeminiRequest, timingSafeEqualString } from "./gemini";
import type { GeminiWorkerEnv } from "../lib/gemini";

const secret = "worker-secret";

function env(overrides: Partial<GeminiWorkerEnv> = {}): GeminiWorkerEnv {
  return {
    GEMINI_API_KEY: "test-gemini-key",
    GEMINI_WORKER_SECRET: secret,
    GEMINI_API_BASE: "https://generativelanguage.googleapis.com",
    ...overrides,
  };
}

function post(path: string, body: unknown, token = secret): Request {
  return new Request(`https://worker.test${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Gemini Worker", () => {
  it("compares caller secrets in constant time", () => {
    expect(timingSafeEqualString("abc", "abc")).toBe(true);
    expect(timingSafeEqualString("abc", "abd")).toBe(false);
    expect(timingSafeEqualString("abc", "abcd")).toBe(false);
  });

  it("reports health without exposing the API key", async () => {
    const response = await handleGeminiRequest(
      new Request("https://worker.test/gemini/health"),
      env(),
    );
    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      geminiConfigured: true,
      models: {
        bulk: "gemini-3.5-flash-lite",
        content: "gemini-3.8-flash",
        reasoning: "gemini-3.1-pro-preview",
      },
    });
    expect(JSON.stringify(payload)).not.toContain("test-gemini-key");
  });

  it("rejects unauthenticated generate calls", async () => {
    const response = await handleGeminiRequest(
      post("/gemini/generate", { prompt: "hello" }, "wrong"),
      env(),
    );
    expect(response.status).toBe(401);
  });

  it("calls Gemini generateContent with Search grounding and the API key header", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: "Spring Valley had 42 new listings last week." }],
            },
            groundingMetadata: {
              webSearchQueries: ["Spring Valley Las Vegas new listings"],
              groundingChunks: [
                {
                  web: {
                    title: "glvar.org",
                    uri: "https://example.com/glvar",
                  },
                },
              ],
            },
          },
        ],
        usageMetadata: {
          promptTokenCount: 80,
          candidatesTokenCount: 20,
          totalTokenCount: 100,
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await handleGeminiRequest(
      post("/gemini/grounded", {
        kind: "gbp-post",
        topic: "weekly listing count",
        market: "Spring Valley, NV",
      }),
      env(),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.grounded).toBe(true);
    expect(payload.sources[0].title).toBe("glvar.org");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-goog-api-key": "test-gemini-key",
        }),
      }),
    );

    const geminiBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(geminiBody.tools).toEqual([{ google_search: {} }]);
    expect(geminiBody.generationConfig.thinkingConfig.thinkingLevel).toBe(
      "medium",
    );
  });

  it("sends listing photos as inline_data on Flash-Lite", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          { content: { parts: [{ text: "Covered patio in Spring Valley." }] } },
        ],
        usageMetadata: {
          promptTokenCount: 40,
          candidatesTokenCount: 12,
          totalTokenCount: 52,
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await handleGeminiRequest(
      post("/gemini/listing-media", {
        mediaTask: "alt-text",
        listing: { city: "Las Vegas", neighborhood: "Spring Valley" },
        media: [{ mimeType: "image/jpeg", data: "ZmFrZS1qcGVn" }],
      }),
      env(),
    );
    const payload = await response.json();
    expect(payload.model).toBe("gemini-3.5-flash-lite");

    const geminiBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(geminiBody.contents[0].parts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          inline_data: {
            mime_type: "image/jpeg",
            data: "ZmFrZS1qcGVn",
          },
        }),
      ]),
    );
  });
});
