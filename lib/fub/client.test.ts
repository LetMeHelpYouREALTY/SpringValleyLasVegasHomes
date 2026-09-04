/**
 * Test: Follow Up Boss API client (upsert / find with retries).
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { FollowUpBossClient } from "./client";

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: { get: () => null },
    json: async () => body,
  };
}

describe("FollowUpBossClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("upserts a person", async () => {
    const client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 0,
    });
    vi.mocked(global.fetch).mockResolvedValueOnce(
      jsonResponse({
        id: 123,
        emails: [{ value: "john@example.com" }],
      }) as Response,
    );

    const result = await client.upsertPerson({
      firstName: "John",
      lastName: "Doe",
      emails: [{ value: "john@example.com" }],
    });

    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/people"),
      expect.objectContaining({ method: "PUT" }),
    );
  });

  it("finds a person by email", async () => {
    const client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 0,
    });
    vi.mocked(global.fetch).mockResolvedValueOnce(
      jsonResponse({
        people: [{ id: 99, emails: [{ value: "jane@example.com" }] }],
      }) as Response,
    );

    const person = await client.findPerson({ email: "jane@example.com" });
    expect(person?.id).toBe(99);
  });

  it("returns null when no person matches", async () => {
    const client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 0,
    });
    vi.mocked(global.fetch).mockResolvedValueOnce(
      jsonResponse({ people: [] }) as Response,
    );

    const person = await client.findPerson({ email: "missing@example.com" });
    expect(person).toBeNull();
  });

  it("retries after a 429 then succeeds", async () => {
    const client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 1,
    });
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(jsonResponse({}, 429) as Response)
      .mockResolvedValueOnce(jsonResponse({ id: 1 }) as Response);

    const result = await client.upsertPerson({
      emails: [{ value: "retry@example.com" }],
    });
    expect(result.id).toBe(1);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
