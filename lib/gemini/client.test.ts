import { describe, expect, it, vi } from "vitest";
import { GeminiWorkerClient } from "./client";

describe("GeminiWorkerClient", () => {
  it("sends Bearer auth and posts grounded drafts to the Worker", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        text: "Draft",
        model: "gemini-3.8-flash",
        task: "grounded",
        grounded: true,
        sources: [],
        searchQueries: ["Spring Valley inventory"],
        usage: { inputTokens: 10, outputTokens: 5, totalTokens: 15 },
        cost: {
          input: 0,
          output: 0,
          total: 0,
          currency: "USD",
          model: "gemini-3.8-flash",
          groundingSearchQueries: 1,
          groundingNote: "",
        },
        fairHousingFlags: [],
      }),
    });

    const client = new GeminiWorkerClient({
      workerUrl: "https://worker.example.workers.dev/",
      workerSecret: "test-secret",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const result = await client.draftGrounded({
      kind: "market-update",
      topic: "Spring Valley inventory",
      market: "Spring Valley, NV",
    });

    expect(result.text).toBe("Draft");
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://worker.example.workers.dev/gemini/grounded",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-secret",
        }),
      }),
    );
  });

  it("throws when the Worker URL is missing", async () => {
    const client = new GeminiWorkerClient({
      workerUrl: "",
      workerSecret: "secret",
      fetchImpl: vi.fn() as unknown as typeof fetch,
    });

    await expect(client.health()).rejects.toThrow("GEMINI_WORKER_URL");
  });
});
