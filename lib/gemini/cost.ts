import { GEMINI_GROUNDING, GEMINI_PRICING, type GeminiModelId } from "./models";
import type { GeminiCost, GeminiUsage } from "./types";

export const GROUNDING_COST_NOTE =
  "Google Search grounding: 5,000 free search queries/month across Gemini 3.x, then $14 per 1,000 queries. Token cost below excludes grounding overage.";

export function calculateGeminiCost(
  model: GeminiModelId,
  usage: Pick<GeminiUsage, "inputTokens" | "outputTokens">,
  groundingSearchQueries = 0,
): GeminiCost {
  const pricing = GEMINI_PRICING[model];
  const input = (usage.inputTokens / 1_000_000) * pricing.inputPerMillion;
  const output = (usage.outputTokens / 1_000_000) * pricing.outputPerMillion;

  return {
    input,
    output,
    total: input + output,
    currency: "USD",
    model,
    groundingSearchQueries,
    groundingNote: GROUNDING_COST_NOTE,
  };
}

/**
 * Estimate Search-query overage if `usedThisMonth` already consumed the
 * shared 5,000 free Gemini 3.x grounded queries.
 */
export function estimateGroundingOverageUsd(
  searchQueriesThisRequest: number,
  usedThisMonthBeforeRequest: number,
): number {
  const alreadyUsed = Math.max(0, usedThisMonthBeforeRequest);
  const freeRemaining = Math.max(
    0,
    GEMINI_GROUNDING.freeMonthlySearchQueries - alreadyUsed,
  );
  const billable = Math.max(0, searchQueriesThisRequest - freeRemaining);
  return (billable / 1000) * GEMINI_GROUNDING.usdPerThousandAfterFree;
}
