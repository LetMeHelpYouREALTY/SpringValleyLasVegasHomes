/**
 * Test: /api/leads/capture — Follow Up Boss upsert path.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

const { findPerson, upsertPerson, addTag, createEvent } = vi.hoisted(() => ({
  findPerson: vi.fn(),
  upsertPerson: vi.fn(),
  addTag: vi.fn(),
  createEvent: vi.fn(),
}));

vi.mock("@/lib/fub/client", () => ({
  FollowUpBossClient: vi.fn().mockImplementation(function FollowUpBossClient() {
    return {
      findPerson,
      upsertPerson,
      addTag,
      createEvent,
    };
  }),
}));

describe("POST /api/leads/capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findPerson.mockResolvedValue(null);
    upsertPerson.mockResolvedValue({
      id: 123,
      emails: [{ value: "john@example.com" }],
    });
    addTag.mockResolvedValue(undefined);
    createEvent.mockResolvedValue({ id: "evt-1" });
  });

  it("creates lead with valid data", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "7025551234",
        message: "Interested in buying",
        source: "website-form",
        stage: "New Lead",
        tags: ["website"],
      }),
    });

    const response = await POST(request as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.personId).toBe(123);
    expect(upsertPerson).toHaveBeenCalled();
  });

  it("returns 400 for missing required fields", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: "7025551234",
      }),
    });

    const response = await POST(request as never);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(String(data.error).toLowerCase()).toContain("required");
  });

  it("returns 400 when email and phone are both missing", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
      }),
    });

    const response = await POST(request as never);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(String(data.error).toLowerCase()).toMatch(/email|phone/);
  });

  it("handles FUB API errors gracefully", async () => {
    upsertPerson.mockRejectedValueOnce(new Error("FUB API unavailable"));

    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    });

    const response = await POST(request as never);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it("upserts with source and stage", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        source: "hero-section",
        stage: "Hot Lead",
        tags: ["website", "hero-cta"],
      }),
    });

    await POST(request as never);

    expect(upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "hero-section",
        stage: "Hot Lead",
      }),
    );
  });

  it("stores property search criteria on the person", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Buyer",
        lastName: "Jones",
        email: "buyer@example.com",
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        bathrooms: 2.5,
        timeline: "1-3 months",
        preApproved: true,
      }),
    });

    await POST(request as never);

    expect(upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        customFields: expect.objectContaining({
          priceMin: 400000,
          priceMax: 600000,
          bedrooms: 3,
          bathrooms: 2.5,
          timeline: "1-3 months",
          preApproved: true,
        }),
      }),
    );
  });
});
