# BodyRank — Official Site

The official waitlist / landing page for **BodyRank**, the AI body scan that rates
your physique across 7 metrics, ranks you Iron → Symmetric, and builds a training
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
