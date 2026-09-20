import { describe, expect, it } from "vitest";
import { flagFairHousingRisks } from "./fair-housing";
import {
  buildGroundedUserPrompt,
  buildListingMediaUserPrompt,
  listingMediaTaskToGeminiTask,
} from "./prompts";

describe("Gemini prompts", () => {
  it("builds a grounded user prompt with market fallback", () => {
    const prompt = buildGroundedUserPrompt({
      kind: "gbp-post",
      topic: "September inventory",
    });
    expect(prompt).toContain("Kind: gbp-post");
    expect(prompt).toContain("Spring Valley, Las Vegas, Nevada");
    expect(prompt).toContain("September inventory");
  });

  it("includes listing facts for media prompts", () => {
    const prompt = buildListingMediaUserPrompt({
      mediaTask: "alt-text",
      listing: {
        neighborhood: "Spring Valley",
        city: "Las Vegas",
        zip: "89147",
        squareFeet: 1842,
      },
    });
    expect(prompt).toContain("ZIP: 89147");
    expect(prompt).toContain("Square feet: 1842");
  });

  it("keeps video scripts on the standard content model", () => {
    expect(listingMediaTaskToGeminiTask("alt-text")).toBe("bulk");
    expect(listingMediaTaskToGeminiTask("video-script")).toBe("content");
  });

  it("flags Fair Housing proxy language", () => {
    expect(
      flagFairHousingRisks("A family-friendly home near good schools"),
    ).toEqual(expect.arrayContaining(["family-friendly", "good-schools"]));
    expect(
      flagFairHousingRisks("1,842 sq ft patio home off Rainbow Blvd"),
    ).toEqual([]);
  });
});
