# Cloudflare Workers (edge + Gemini automation)

Primary production remains **Vercel** (`www.springvalleylasvegashomes.com`). Keep Cloudflare DNS **gray cloud** for the web hostnames. This Worker is the existing edge layer (cache, headers, images, analytics) plus a `/gemini/*` automation API.

## Gemini setup

The Gemini key is a **Worker secret**, not a Next.js / Vercel env var. The Worker calls the Gemini Developer API with `fetch` and `x-goog-api-key` ([generateContent](https://ai.google.dev/gemini-api/docs/generate-content/get-started), [Search grounding](https://ai.google.dev/gemini-api/docs/generate-content/google-search), Sept 2026).

```bash
# Preview / workers.dev
pnpm cloudflare:secret:gemini          # wrangler secret put GEMINI_API_KEY
pnpm cloudflare:secret:worker          # wrangler secret put GEMINI_WORKER_SECRET

# Production env
wrangler secret put GEMINI_API_KEY --env production
wrangler secret put GEMINI_WORKER_SECRET --env production
```

Local:

```bash
cp .dev.vars.example .dev.vars   # gitignored
pnpm cloudflare:dev
```

On the Next.js / Vercel side (server only), set:

- `GEMINI_WORKER_URL` — e.g. `https://springvalleylasvegashomes-worker.<account>.workers.dev`
- `GEMINI_WORKER_SECRET` — same value as the Worker secret

Use `getGeminiWorkerClient()` from `lib/gemini`. Do not put `GEMINI_API_KEY` in Vercel.

## Routes

| Method | Path                    | Purpose                                         |
| ------ | ----------------------- | ----------------------------------------------- |
| GET    | `/gemini/health`        | Models + whether the API key is configured      |
| POST   | `/gemini/generate`      | Generic generateContent (optional `grounded`)   |
| POST   | `/gemini/grounded`      | Search-grounded GBP / market-update drafts      |
| POST   | `/gemini/listing-media` | Alt text, geo descriptions, tags, video scripts |

POST routes require `Authorization: Bearer <GEMINI_WORKER_SECRET>`.

## Model routing (Sept 2026 pricing)

| Task                       | Model                    | USD / 1M tokens                          |
| -------------------------- | ------------------------ | ---------------------------------------- |
| Bulk / listing media       | `gemini-3.5-flash-lite`  | $0.30 / $2.50                            |
| Standard + grounded drafts | `gemini-3.8-flash`       | $0.75 / $3.75 (intro through 2026-12-31) |
| Complex reasoning          | `gemini-3.1-pro-preview` | $2.00 / $12.00                           |

Search grounding: 5,000 free Search queries/month across Gemini 3.x, then $14 / 1,000 queries.

Drafts are **not** auto-published to GBP or Follow Up Boss. Review Fair Housing flags on the response first.
