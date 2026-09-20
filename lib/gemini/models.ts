/**
 * Gemini model routing and Sept 2026 Developer API pricing.
 *
 * Sources (retrieved 2026-09-20):
 * - https://ai.google.dev/gemini-api/docs/pricing
 * - https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash
 * - https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview
 *
 * 3.8 Flash introductory rates apply through 2026-12-31; standard rates
 * ($1.50 / $7.50 per 1M) start 2027-01-01.
 */

export const GEMINI_MODELS = {
  /** Bulk/cheap: alt text, tagging, batch listing media. */
  flashLite: "gemini-3.5-flash-lite",
  /** Standard content + Search-grounded GBP / market drafts. */
  flash: "gemini-3.8-flash",
  /** Complex reasoning / analysis. Official ID is still preview. */
  pro: "gemini-3.1-pro-preview",
} as const;

export type GeminiModelId = (typeof GEMINI_MODELS)[keyof typeof GEMINI_MODELS];

export type GeminiTask =
  | "bulk"
  | "content"
  | "reasoning"
  | "grounded"
  | "listing-media";

export type GeminiThinkingLevel = "low" | "medium" | "high";

export type GeminiModelPricing = {
  inputPerMillion: number;
  outputPerMillion: number;
};

/** Paid-tier USD per 1M tokens (prompts ≤ 200k). Dated Sept 2026. */
export const GEMINI_PRICING: Record<GeminiModelId, GeminiModelPricing> = {
  "gemini-3.5-flash-lite": { inputPerMillion: 0.3, outputPerMillion: 2.5 },
  "gemini-3.8-flash": { inputPerMillion: 0.75, outputPerMillion: 3.75 },
  "gemini-3.1-pro-preview": { inputPerMillion: 2.0, outputPerMillion: 12.0 },
};

/**
 * Grounding with Google Search (Gemini 3.x, shared monthly pool).
 * Billed per Search query the model executes, not per prompt.
 */
export const GEMINI_GROUNDING = {
  freeMonthlySearchQueries: 5000,
  usdPerThousandAfterFree: 14,
} as const;

export const GEMINI_API_BASE = "https://generativelanguage.googleapis.com";

export function isGeminiModelId(value: string): value is GeminiModelId {
  return Object.values(GEMINI_MODELS).includes(value as GeminiModelId);
}

export function selectGeminiModel(task: GeminiTask): GeminiModelId {
  switch (task) {
    case "bulk":
    case "listing-media":
      return GEMINI_MODELS.flashLite;
    case "content":
    case "grounded":
      return GEMINI_MODELS.flash;
    case "reasoning":
      return GEMINI_MODELS.pro;
    default: {
      const exhaustive: never = task;
      return exhaustive;
    }
  }
}

export function selectThinkingLevel(task: GeminiTask): GeminiThinkingLevel {
  switch (task) {
    case "bulk":
    case "listing-media":
      return "low";
    case "content":
    case "grounded":
      return "medium";
    case "reasoning":
      return "high";
    default: {
      const exhaustive: never = task;
      return exhaustive;
    }
  }
}

export function defaultMaxOutputTokens(task: GeminiTask): number {
  switch (task) {
    case "bulk":
    case "listing-media":
      return 512;
    case "content":
    case "grounded":
      return 1024;
    case "reasoning":
      return 2048;
    default: {
      const exhaustive: never = task;
      return exhaustive;
    }
  }
}
