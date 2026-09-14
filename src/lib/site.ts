// Canonical site configuration. Single source of truth for the production domain.
// Override in other environments (previews, staging) via NEXT_PUBLIC_SITE_URL.

const FALLBACK_URL = "https://bodyrank.net";

export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/$/, "");

export const SITE_NAME = "BodyRank";

export const STRENGTH_CALCULATOR_PATH = "/how-strong-am-i";

// Set NEXT_PUBLIC_APP_STORE_URL on launch day: the calculator's app CTA swaps its
// waitlist form for an App Store download button.
export const APP_STORE_URL: string | null = process.env.NEXT_PUBLIC_APP_STORE_URL || null;

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
