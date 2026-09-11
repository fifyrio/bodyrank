// Canonical site configuration. Single source of truth for the production domain.
// Override in other environments (previews, staging) via NEXT_PUBLIC_SITE_URL.

const FALLBACK_URL = "https://bodyrank.net";

export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/$/, "");

export const SITE_NAME = "BodyRank";

export const SITE_TITLE = "BodyRank — Scan. Rank. Transform.";

export const SITE_DESCRIPTION =
  "The AI body scan that rates your physique across 7 metrics, ranks you on the six-tier BodyRank ladder, and builds your training plan around what it finds.";

export const STRENGTH_CALCULATOR_PATH = "/how-strong-am-i";

// Set NEXT_PUBLIC_APP_STORE_URL on launch day: the calculator's app CTA swaps its
// waitlist form for an App Store download button.
export const APP_STORE_URL: string | null = process.env.NEXT_PUBLIC_APP_STORE_URL || null;
