/**
 * Worker bindings + secrets. Secrets are listed so TypeScript knows them;
 * values are set only via `wrangler secret put` (never in wrangler.toml).
 *
 * Regenerate after config changes:
 *   pnpm cloudflare:types
 */

interface Env {
  DEBUG?: string;
  GEMINI_API_BASE?: string;
  GEMINI_DEFAULT_MODEL?: string;
  GEMINI_API_KEY?: string;
  GEMINI_WORKER_SECRET?: string;
  ANALYTICS_DATASET?: AnalyticsEngineDataset;
  CF_IMAGES_URL?: string;
  OPENROUTER_API_KEY?: string;
  NEXT_PUBLIC_REALSCOUT_AGENT_ID?: string;
}

interface AnalyticsEngineDataset {
  writeDataPoint(data: {
    blobs?: string[];
    doubles?: number[];
    indexes?: string[];
  }): void;
}
