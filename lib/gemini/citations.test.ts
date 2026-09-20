import { describe, expect, it } from "vitest";
import {
  extractGeminiText,
  extractSearchQueries,
  extractSources,
  extractUsage,
} from "./citations";

const groundedPayload = {
  candidates: [
    {
      content: {
        parts: [
          { text: "Spring Valley median is UNKNOWN pending a sourced figure." },
        ],
      },
      groundingMetadata: {
        webSearchQueries: [
          "Spring Valley Las Vegas median home price 2026",
          "",
        ],
        groundingChunks: [
          {
            web: {
              title: "example.com",
              uri: "https://example.com/market",
            },
          },
          {
            web: {
              title: "duplicate",
              uri: "https://example.com/market",
            },
          },
        ],
      },
    },
  ],
  usageMetadata: {
    promptTokenCount: 120,
    candidatesTokenCount: 40,
    totalTokenCount: 160,
    thoughtsTokenCount: 8,
  },
};

describe("Gemini citation helpers", () => {
  it("joins text parts and drops empty search queries", () => {
    expect(extractGeminiText(groundedPayload)).toContain("Spring Valley");
    expect(extractSearchQueries(groundedPayload)).toEqual([
      "Spring Valley Las Vegas median home price 2026",
    ]);
  });

  it("dedupes grounding sources by URI", () => {
    expect(extractSources(groundedPayload)).toEqual([
      { title: "example.com", uri: "https://example.com/market" },
    ]);
  });

  it("maps usage metadata", () => {
    expect(extractUsage(groundedPayload)).toEqual({
      inputTokens: 120,
      outputTokens: 40,
      totalTokens: 160,
      thoughtsTokens: 8,
    });
  });
});
