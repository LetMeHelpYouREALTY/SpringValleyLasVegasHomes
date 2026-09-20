import type { GeminiSource } from "./types";

export type GeminiGroundingChunk = {
  web?: {
    uri?: string;
    title?: string;
  };
};

export type GeminiGroundingMetadata = {
  webSearchQueries?: string[];
  groundingChunks?: GeminiGroundingChunk[];
};

export type GeminiCandidate = {
  content?: {
    parts?: Array<{ text?: string }>;
  };
  groundingMetadata?: GeminiGroundingMetadata;
};

export type GeminiGenerateContentResponse = {
  candidates?: GeminiCandidate[];
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
    thoughtsTokenCount?: number;
  };
  error?: {
    message?: string;
    status?: string;
  };
};

export function extractGeminiText(
  payload: GeminiGenerateContentResponse,
): string {
  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  return parts
    .map((part) => part.text ?? "")
    .join("")
    .trim();
}

export function extractSearchQueries(
  payload: GeminiGenerateContentResponse,
): string[] {
  const queries =
    payload.candidates?.[0]?.groundingMetadata?.webSearchQueries ?? [];
  return queries
    .map((query) => query.trim())
    .filter((query) => query.length > 0);
}

export function extractSources(
  payload: GeminiGenerateContentResponse,
): GeminiSource[] {
  const chunks =
    payload.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  const seen = new Set<string>();
  const sources: GeminiSource[] = [];

  for (const chunk of chunks) {
    const uri = chunk.web?.uri?.trim();
    if (!uri || seen.has(uri)) {
      continue;
    }
    seen.add(uri);
    sources.push({
      title: chunk.web?.title?.trim() || uri,
      uri,
    });
  }

  return sources;
}

export function extractUsage(payload: GeminiGenerateContentResponse): {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  thoughtsTokens?: number;
} {
  const usage = payload.usageMetadata ?? {};
  const thoughtsTokens = usage.thoughtsTokenCount;
  return {
    inputTokens: usage.promptTokenCount ?? 0,
    outputTokens: usage.candidatesTokenCount ?? 0,
    totalTokens: usage.totalTokenCount ?? 0,
    ...(thoughtsTokens !== undefined ? { thoughtsTokens } : {}),
  };
}
