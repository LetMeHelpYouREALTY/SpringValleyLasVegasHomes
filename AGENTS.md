# AGENTS.md — Spring Valley Las Vegas Homes

Stack: **Next.js 14+ App Router**, **TypeScript**, **Tailwind**, **pnpm** (`packageManager` in `package.json`).

## Hosting & DNS (March 2026)

Canonical production URL is **`https://www.springvalleylasvegashomes.com`** (see `lib/site-config.ts` `siteConfig.url`). Apex should redirect to `www` (Vercel handles this once both hostnames are added in the project).

| Layer | Role |
|--------|------|
| **Vercel** | Primary production for `www.springvalleylasvegashomes.com` — use `vercel build` / `vercel deploy --prebuilt` for parity checks. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project to enable the interactive map on `/las-vegas-zip-code-map` (zip directory works without it). |
| **Cloudflare** | **DNS provider** for the zone. For the **web** hostnames that point at Vercel (`A` apex and `www` **CNAME** to `*.vercel-dns-*`), keep **DNS only (gray cloud)** — do **not** enable orange-cloud proxying for those records. Proxying in front of Vercel commonly causes SSL/certificate edge cases; gray cloud matches Vercel + Cloudflare DNS-only setup. You still use Cloudflare for email (MX/TXT), verification TXT, DKIM, and products like **Cloudflare Images** (`imagedelivery.net`) — those are unrelated to HTTP proxy status. |
| **Git** | **Canonical remote:** `https://github.com/LetMeHelpYouREALTY/SpringValleyLasVegasHomes.git` (not `DrJanDuffy/…`). `main` is the production branch. See `CONTRIBUTING.md` for pnpm, branches, and PR checklist. |
| **Vercel project** | Team **janet-duffys-projects**, project **`spring-valley-las-vegas-homes`**. Git integration must point at **LetMeHelpYouREALTY/SpringValleyLasVegasHomes** so `git push origin main` auto-deploys Production. If push does not deploy: `vercel link --project spring-valley-las-vegas-homes` then `vercel git connect https://github.com/LetMeHelpYouREALTY/SpringValleyLasVegasHomes.git` and/or `vercel --prod`. |

### DNS checklist (Cloudflare dashboard)

1. **A** record for `springvalleylasvegashomes.com` and **CNAME** `www` → Vercel target: **Proxied: DNS only** (gray cloud).
2. **MX** / **TXT** (SPF, DKIM, domain verification): leave **DNS only** (typical for mail).
3. Optional email hygiene: use Cloudflare’s **DMARC** wizard if you send mail from this domain (does not change the website).

### Vercel domain checklist

In **Vercel → Project → Settings → Domains**: both `www.springvalleylasvegashomes.com` and `springvalleylasvegashomes.com` are added, SSL shows **Valid**, and redirect behavior matches **www** as primary (apex → www).

**Smoke test:** `curl -sI https://springvalleylasvegashomes.com` should show a redirect to `https://www.springvalleylasvegashomes.com/`; `curl -sI https://www.springvalleylasvegashomes.com` should return **200** with `Server: Vercel`.

## PageSpeed Insights & Core Web Vitals

- **Always test the canonical host** in [PageSpeed Insights](https://pagespeed.web.dev/): `https://www.springvalleylasvegashomes.com/` (not `http` apex — extra redirect skews lab metrics).
- **Two different blocks in PSI:** (1) *Discover what your real users are experiencing* = Chrome UX Report **field** data — **“No Data”** for a URL is common when CrUX has insufficient public samples; it does not remove the **Diagnose performance issues** Lighthouse **lab** section below. (2) *Diagnose performance issues* = simulated **LCP, TBT, Opportunities** — use this for regressions after deploys.
- **Field vitals over time:** prefer **Google Search Console → Core Web Vitals** at the **origin** or URL group when PSI shows no CrUX for a single URL.

## Cursor AI

- Prefer **`pnpm`** over `npm`/`yarn` in commands and CI.
- **Do not edit** `components/idx/**` without explicit approval (MLS compliance).
- **Integrations** (`lib/integrations.ts`): **RealScout** portal URL + agent id + widget script; **Homebot** optional iframe URL; **FUB** default lead tag (`FUB_DEFAULT_LEAD_TAG`, default `spring-valley-site`). RealScout script loads once in root layout; CSP must include `em.realscout.com` and `www.realscout.com` for `script-src` and `connect-src`; Homebot uses `*.homebot.com` / `*.homebot.ai` in CSP + `frame-src`. See `.env.example` and `.env.fub.example`.
- Scoped rules live under **`.cursor/rules/`** (and user global rules). When editing `app/**/page.tsx`, follow real-estate marketing + NAP rules.
- Large folders are listed in **`.cursorignore`** to keep indexing fast; lockfiles remain tracked in git.

## Secrets

- Never commit live keys. Use `.env.example` and Vercel / GitHub **Secrets**. `.cursor/mcp.json` is gitignored.

## Quality gates before merge

`pnpm exec tsc --noEmit` → `pnpm lint` → `pnpm format:check` → `vercel build` (when validating production-like output).
