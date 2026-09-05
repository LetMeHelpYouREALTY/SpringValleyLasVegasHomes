/**
 * Test: Claude API rate-limit store (token window per client).
 */

import { describe, it, expect, beforeEach } from "vitest";
import { rateLimitStore } from "./claude-rate-limit";

const config = {
  requestsPerMinute: 10,
  tokensPerMinute: 100000,
  enabled: true,
};

describe("Claude Rate Limiting", () => {
  beforeEach(() => {
    rateLimitStore.reset();
  });

  it("allows requests within rate limit", async () => {
    const clientId = "client-1";
    const result1 = await rateLimitStore.checkLimit(clientId, config);
    expect(result1.allowed).toBe(true);

    const result2 = await rateLimitStore.checkLimit(clientId, config);
    expect(result2.allowed).toBe(true);
    expect(rateLimitStore.getUsage(clientId).requestsLastMinute).toBe(2);
  });

  it("blocks requests exceeding rate limit", async () => {
    const clientId = "client-excessive";
    for (let i = 0; i < 10; i++) {
      const result = await rateLimitStore.checkLimit(clientId, config);
      expect(result.allowed).toBe(true);
    }
    const blocked = await rateLimitStore.checkLimit(clientId, config);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("tracks different clients separately", async () => {
    for (let i = 0; i < 10; i++) {
      await rateLimitStore.checkLimit("client-1", config);
    }
    const blocked = await rateLimitStore.checkLimit("client-1", config);
    expect(blocked.allowed).toBe(false);

    const allowed = await rateLimitStore.checkLimit("client-2", config);
    expect(allowed.allowed).toBe(true);
  });

  it("provides retry-after time when blocked", async () => {
    const clientId = "client-retry";
    for (let i = 0; i < 10; i++) {
      await rateLimitStore.checkLimit(clientId, config);
    }
    const blocked = await rateLimitStore.checkLimit(clientId, config);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeDefined();
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(blocked.retryAfter).toBeLessThanOrEqual(60);
  });

  it("allows all traffic when disabled", async () => {
    const result = await rateLimitStore.checkLimit("anyone", {
      ...config,
      enabled: false,
    });
    expect(result.allowed).toBe(true);
  });
});
