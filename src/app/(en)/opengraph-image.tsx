import { ogContentType, ogSize, renderOgImage } from "@/app/_pages/og";
import { STRINGS } from "@/lib/i18n";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "BodyRank — Scan. Rank. Transform.";

export default function OpenGraphImage() {
  const t = STRINGS.en;
  return renderOgImage({
    eyebrow: t.eyebrow,
    title: "Scan. Rank. Transform.",
    footnote: "bodyrank.net",
  });
}
