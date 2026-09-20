import type { GeminiModelId, GeminiTask, GeminiThinkingLevel } from "./models";

export type GeminiWorkerEnv = {
  GEMINI_API_KEY?: string;
  GEMINI_WORKER_SECRET?: string;
  GEMINI_API_BASE?: string;
  GEMINI_DEFAULT_MODEL?: string;
  DEBUG?: string;
  ANALYTICS_DATASET?: {
    writeDataPoint(data: {
      blobs?: string[];
      doubles?: number[];
      indexes?: string[];
    }): void;
  };
};

export type GeminiMediaInput = {
  mimeType: string;
  /** Base64 payload (no data: URL prefix). Prefer for small files < 10MB. */
  data?: string;
  /** Public HTTPS URL the Worker fetches (listing photos on Cloudflare Images). */
  url?: string;
  /** Gemini Files API URI for larger / reused assets. */
  fileUri?: string;
};

export type GeminiListingContext = {
  address?: string;
  neighborhood?: string;
  city?: string;
  zip?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
};

export type GeminiListingMediaTask =
  | "alt-text"
  | "geo-description"
  | "video-script"
  | "tagging";

export type GeminiGroundedKind = "gbp-post" | "market-update" | "custom";

export type GeminiGenerateRequest = {
  task?: GeminiTask;
  model?: GeminiModelId;
  prompt: string;
  systemInstruction?: string;
  grounded?: boolean;
  thinkingLevel?: GeminiThinkingLevel;
  maxOutputTokens?: number;
  media?: GeminiMediaInput[];
};

export type GeminiGroundedRequest = {
  kind: GeminiGroundedKind;
  topic: string;
  market?: string;
  extraInstructions?: string;
  model?: GeminiModelId;
};

export type GeminiListingMediaRequest = {
  mediaTask: GeminiListingMediaTask;
  media: GeminiMediaInput[];
  listing?: GeminiListingContext;
  extraInstructions?: string;
  model?: GeminiModelId;
};

export type GeminiSource = {
  title: string;
  uri: string;
};

export type GeminiUsage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  thoughtsTokens?: number;
};

export type GeminiCost = {
  input: number;
  output: number;
  total: number;
  currency: "USD";
  model: GeminiModelId;
  groundingSearchQueries: number;
  groundingNote: string;
};

export type GeminiSuccessResponse = {
  ok: true;
  text: string;
  model: GeminiModelId;
  task: GeminiTask;
  grounded: boolean;
  sources: GeminiSource[];
  searchQueries: string[];
  usage: GeminiUsage;
  cost: GeminiCost;
  fairHousingFlags: string[];
};

export type GeminiErrorResponse = {
  ok: false;
  error: string;
  status: number;
};

export type GeminiHealthResponse = {
  ok: true;
  service: "gemini-worker";
  geminiConfigured: boolean;
  models: {
    bulk: GeminiModelId;
    content: GeminiModelId;
    reasoning: GeminiModelId;
  };
};

export const GEMINI_WORKER_PATHS = {
  health: "/gemini/health",
  generate: "/gemini/generate",
  grounded: "/gemini/grounded",
  listingMedia: "/gemini/listing-media",
} as const;
