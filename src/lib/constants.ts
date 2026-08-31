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

// Gallery screenshots — keys map to files in /public/shots and to shot copy in i18n.
// Intrinsic dimensions preserve each phone screenshot's aspect ratio.
export interface Shot {
  key: string;
  width: number;
  height: number;
}

export const SHOTS: Shot[] = [
  { key: "welcome", width: 360, height: 815 },
  { key: "rankintro", width: 360, height: 815 },
  { key: "ranktab", width: 360, height: 960 },
  { key: "muscle", width: 360, height: 945 },
  { key: "future", width: 360, height: 815 },
];
