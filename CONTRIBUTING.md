# Contributing & Git workflow

This repo uses **pnpm** (`packageManager` in `package.json`). Prefer `pnpm` over `npm`/`yarn` so the lockfile stays consistent.

## Before opening a PR

1. `pnpm exec tsc --noEmit`
2. `pnpm lint`
3. `pnpm format:check` (or `pnpm format` to write)
4. Production checks: prefer `vercel build` when validating deploy parity (see project rules).

## Branches

- **`main`** — production-ready history; deploy from here.
- **`feature/<short-topic>`** — new work (e.g. `feature/zip-map-seo`).
- **`fix/<issue>`** — bugfixes.

Rebase or merge from `main` regularly to avoid drift.

## Commits

Use clear, imperative subjects (optional [Conventional Commits](https://www.conventionalcommits.org/) style):

- `feat: add Enterprise neighborhood page`
- `fix: correct listing canonical URL`
- `chore: update gitignore for turbo cache`
- `deps: bump next` (often via Dependabot)

## Do not commit

- Secrets, `.env*`, API keys — use `.env.example` and platform env (see `security-env` rules).
- Local tool folders: `.vercel`, `.next`, `.turbo`, `.wrangler` (see `.gitignore`).
- Large binaries: use CDN/static hosting or Git LFS if you must version them.

## GitHub

- **CODEOWNERS** — default reviewer paths (`.github/CODEOWNERS`).
- **Dependabot** — `.github/dependabot.yml`; auto-merge workflow where enabled.
- **Pull requests** — use `.github/PULL_REQUEST_TEMPLATE.md`.

## Vercel

- Project should use **pnpm** (lockfile + `packageManager`); `vercel.json` sets `installCommand` for consistency.
- **Do not** set a custom `outputDirectory` for Next.js on Vercel — the framework preset handles output.
- Env vars: configure in the Vercel dashboard; reference in code via `process.env` / `NEXT_PUBLIC_*` only as needed.

### Interactive Las Vegas zip map (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)

The [`/las-vegas-zip-code-map`](app/las-vegas-zip-code-map/page.tsx) page shows a searchable zip directory without a key; the **embedded Google Map** loads only when this variable is set at **build** time.

1. **Google Cloud Console** — Select or create a project; enable **Maps JavaScript API**. Create an **API key**; under **Application restrictions**, choose **HTTP referrers** and add your site (e.g. `https://www.springvalleylasvegashomes.com/*`) and local dev (`http://localhost:3000/*`) if needed.
2. **Vercel** — Project **Settings → Environment Variables**: add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with the key value; enable for **Production** and **Preview** if previews should show the map (add matching preview hostnames to the key’s referrer list).
3. **Redeploy** — Trigger a new deployment so Next.js inlines the public env var.

Do not commit API keys; use Vercel (or `.env.local` for local dev only, gitignored).

## Cloudflare

- If the domain uses **Vercel for HTTPS**, keep Cloudflare proxy **off** for that hostname (DNS-only) unless you use a documented **Cloudflare + Vercel** SSL setup.
- **GitHub Actions** (`cloudflare-deploy.yml`) uses **pnpm** and env **`CF_PAGES_PROJECT`** (default `springvalleylasvegashomes-com`). Change it to match your **Cloudflare Pages** project name in the dashboard.
- **Gemini Worker** (`/gemini/*` on the existing edge Worker): store the API key only as a Worker secret (`pnpm cloudflare:secret:gemini` → `wrangler secret put GEMINI_API_KEY`). Repeat with `--env production`. Next.js talks to the Worker with `GEMINI_WORKER_URL` + `GEMINI_WORKER_SECRET` (see `.env.gemini.example` and `workers/README.md`). Never commit `.dev.vars`.

## Line endings

Repository uses **LF**. `.gitattributes` enforces normalization; on Windows, set `git config core.autocrlf input` (or rely on EditorConfig + Git attributes).

## Next.js 15 + React 19 upgrade (scheduled)

Upgrade is **not** required for day-to-day work on this repo. When you choose to migrate:

1. Read the [Next.js 15 upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15) (async `params` / `searchParams`, caching defaults, etc.).
2. Bump `next`, `react`, `react-dom`, `eslint-config-next`, and `@types/react*` together in one branch.
3. Run `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format:check`, then `vercel build` before merging.

Track breaking changes for App Router, `next/image`, and any experimental flags in `next.config.js`.
