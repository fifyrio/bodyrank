# BodyRank — Official Site

The official waitlist / landing page for **BodyRank**, the AI body scan that rates
your physique across 7 metrics, ranks you on the six-tier BodyRank ladder (Iron → Aesthetic), and builds a training
plan around what it finds.

Rebuilt in **Next.js (App Router) + TypeScript** from the original single-file
prototype, with real bilingual copy (EN / ES) and a working waitlist backend.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript (strict)
- `next/font` for the Anton / Sora / IBM Plex Mono type system
- `next/image` for the optimized app screenshots
- Plain global CSS with design tokens (ported faithfully from the prototype)

## Getting started

Managed with **pnpm**.

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

```bash
pnpm build && pnpm start   # production
```

## Domain & SEO

Production domain: **[bodyrank.net](https://bodyrank.net)**.

The canonical URL lives in `src/lib/site.ts` and feeds `metadataBase`, Open Graph /
Twitter tags, `sitemap.xml`, and `robots.txt`. Override per-environment (preview /
staging) with `NEXT_PUBLIC_SITE_URL`:

```bash
NEXT_PUBLIC_SITE_URL="https://<preview-url>" pnpm build
```

## Strength calculator (`/how-strong-am-i`)

SEO tool page targeting "how strong am I": bench / squat / deadlift → strength
percentile for sex, age and bodyweight, mapped onto the BodyRank ladder (Iron → Aesthetic),
followed by an app CTA, a standards table and an FAQ (with `FAQPage` JSON-LD).

- Model: `src/lib/strength/model.ts` — pure functions. Epley 1RM estimate, age
  coefficients, allometric (bodyweight^⅔) scaling, log-normal interpolation through
  lifter strength standards. Tests: `pnpm test` (Node's built-in runner, no deps).
- Copy: `src/lib/strength/i18n.ts` (EN / ES). FAQ numbers are derived from the
  model — re-check them if you change `STANDARDS`.
- App CTA: shows the waitlist until `NEXT_PUBLIC_APP_STORE_URL` is set, then an
  App Store button.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, providers
│   ├── page.tsx              # section composition
│   └── api/waitlist/route.ts # signup API (validate, dedupe, persist)
├── components/               # Topbar, Hero, Gallery, CoreLoop, Ladder, Metrics, FooterCta, WaitlistForm
├── context/                  # LanguageContext (EN/ES), WaitlistContext (shared count)
├── lib/                      # i18n.ts (all copy), constants.ts (tiers, metrics, shots)
└── styles/globals.css        # design tokens + component styles
public/
├── logo.webp, logomark.webp
└── shots/*.webp              # app screenshots
```

## Internationalization

All copy lives in `src/lib/i18n.ts` (`STRINGS.en` / `STRINGS.es`). The language
toggle in the top bar switches the whole page client-side and persists the choice
to `localStorage`. `<html lang>` and the document title update with the language.

## Waitlist backend

`POST /api/waitlist` validates the email server-side, dedupes case-insensitively,
and persists to `data/waitlist.json` (gitignored). `GET /api/waitlist` returns the
current signup count, which drives the "N already on the list" counter. Both the
hero and footer forms share the same count via `WaitlistContext`.

> The JSON-file store is intentionally simple for a single-instance deployment.
> Swap `src/app/api/waitlist/route.ts` for a database or an email provider (e.g.
> a Resend/ConvertKit list) before scaling.

## TikTok referral tracking

Share **`https://bodyrank.net/tiktok`** in your TikTok bio / videos. Every visit:

1. increments a click counter (total + per-day, UTC) in `data/tiktok.json`
2. `302`-redirects the visitor to the homepage (`/?ref=tiktok`)

Read the numbers any time:

```bash
curl https://bodyrank.net/api/tiktok
# { "count": 128, "byDay": { "2026-09-01": 40, "2026-09-02": 88 } }
```

The redirect uses `302` (uncached) so repeat visits are all counted, and a tracking
write failure never blocks the redirect. Counter storage is generic
(`src/lib/counterStore.ts`) — add more campaign links (e.g. `/instagram`) by
reusing `incrementCounter("<name>")`.
