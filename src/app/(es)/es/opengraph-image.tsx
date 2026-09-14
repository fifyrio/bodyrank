import { ogContentType, ogSize, renderOgImage } from "@/app/_pages/og";
import { STRINGS } from "@/lib/i18n";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "BodyRank — Escanea. Clasifica. Transfórmate.";

export default function OpenGraphImage() {
  const t = STRINGS.es;
  return renderOgImage({
    eyebrow: t.eyebrow,
    title: "Escanea. Clasifica. Transfórmate.",
    footnote: "bodyrank.net/es",
  });
}
