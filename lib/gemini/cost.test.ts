import { describe, expect, it } from "vitest";
import { calculateGeminiCost, estimateGroundingOverageUsd } from "./cost";

describe("Gemini cost", () => {
  it("prices Flash-Lite at $0.30 / $2.50 per million tokens", () => {
    const cost = calculateGeminiCost("gemini-3.5-flash-lite", {
      inputTokens: 1_000_000,
      outputTokens: 1_000_000,
    });
    expect(cost.input).toBeCloseTo(0.3);
    expect(cost.output).toBeCloseTo(2.5);
    expect(cost.total).toBeCloseTo(2.8);
    expect(cost.groundingSearchQueries).toBe(0);
  });

  it("prices 3.8 Flash at introductory $0.75 / $3.75 per million", () => {
    const cost = calculateGeminiCost(
      "gemini-3.8-flash",
      { inputTokens: 2_000_000, outputTokens: 200_000 },
      2,
    );
    expect(cost.input).toBeCloseTo(1.5);
    expect(cost.output).toBeCloseTo(0.75);
    expect(cost.groundingSearchQueries).toBe(2);
  });

  it("prices 3.1 Pro at $2 / $12 per million", () => {
    const cost = calculateGeminiCost("gemini-3.1-pro-preview", {
      inputTokens: 500_000,
      outputTokens: 100_000,
    });
    expect(cost.input).toBeCloseTo(1.0);
    expect(cost.output).toBeCloseTo(1.2);
    expect(cost.total).toBeCloseTo(2.2);
  });

  it("does not bill grounding while the 5,000 free monthly queries remain", () => {
    expect(estimateGroundingOverageUsd(3, 100)).toBe(0);
  });

  it("bills $14 per 1,000 Search queries after the free pool", () => {
    expect(estimateGroundingOverageUsd(2, 4999)).toBeCloseTo(0.014);
    expect(estimateGroundingOverageUsd(1000, 5000)).toBeCloseTo(14);
  });
});
