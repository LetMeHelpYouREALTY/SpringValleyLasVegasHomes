import { describe, expect, it } from "vitest";
import {
  GEMINI_MODELS,
  defaultMaxOutputTokens,
  isGeminiModelId,
  selectGeminiModel,
  selectThinkingLevel,
} from "./models";

describe("Gemini model routing", () => {
  it("routes bulk and listing-media to Flash-Lite", () => {
    expect(selectGeminiModel("bulk")).toBe(GEMINI_MODELS.flashLite);
    expect(selectGeminiModel("listing-media")).toBe(GEMINI_MODELS.flashLite);
    expect(selectThinkingLevel("bulk")).toBe("low");
  });

  it("routes standard and grounded content to 3.8 Flash", () => {
    expect(selectGeminiModel("content")).toBe(GEMINI_MODELS.flash);
    expect(selectGeminiModel("grounded")).toBe(GEMINI_MODELS.flash);
    expect(selectThinkingLevel("grounded")).toBe("medium");
  });

  it("routes complex reasoning to 3.1 Pro preview", () => {
    expect(selectGeminiModel("reasoning")).toBe(GEMINI_MODELS.pro);
    expect(selectThinkingLevel("reasoning")).toBe("high");
    expect(defaultMaxOutputTokens("reasoning")).toBe(2048);
  });

  it("validates known model IDs only", () => {
    expect(isGeminiModelId("gemini-3.8-flash")).toBe(true);
    expect(isGeminiModelId("gemini-1.5-pro")).toBe(false);
  });
});
