// Static structural data that is language-independent in the original page.

export interface Tier {
  name: string;
  tag: string;
  colorVar: string;
}

// Six-tier rank ladder, Iron to Symmetric.
export const TIERS: Tier[] = [
  { name: "IRON", tag: "TIER 1", colorVar: "var(--iron)" },
  { name: "BRONZE", tag: "TIER 2", colorVar: "var(--bronze)" },
  { name: "SILVER", tag: "TIER 3", colorVar: "var(--silver)" },
  { name: "GOLD", tag: "TIER 4", colorVar: "var(--gold)" },
  { name: "PLATINUM", tag: "TIER 5", colorVar: "var(--platinum)" },
  { name: "SYMMETRIC", tag: "TIER 6 · TOP 1%", colorVar: "var(--cyan)" },
];

// The 7 physique metrics scored on every scan.
export const METRIC_LABELS: string[] = [
  "OVERALL",
  "POTENTIAL",
  "DEFINITION",
  "SYMMETRY",
  "BODY FAT",
  "V-TAPER",
  "MUSCLE MASS",
];

// Full-screen app captures shown in the auto-scrolling phone showcase.
// Files live in /public/app; aspect ratio is a real iPhone screen (1179 x 2556).
export interface AppScreen {
  src: string;
  alt: string;
}

export const SCREEN_ASPECT = 1179 / 2556;

// Ordered as a short product tour.
export const APP_SCREENS: AppScreen[] = [
  { src: "/app/screen-1.webp", alt: "Get your body score" },
  { src: "/app/screen-3.webp", alt: "Climb the global ranks" },
  { src: "/app/screen-6.webp", alt: "See every muscle worked" },
  { src: "/app/screen-2.webp", alt: "AI finds your weak links" },
  { src: "/app/screen-4.webp", alt: "A plan that adapts" },
  { src: "/app/screen-5.webp", alt: "Meet your future self" },
];
