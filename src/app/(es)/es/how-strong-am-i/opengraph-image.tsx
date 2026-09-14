import { ogContentType, ogSize, renderOgImage } from "@/app/_pages/og";
import { STRENGTH_STRINGS } from "@/lib/strength/i18n";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "¿Qué tan fuerte soy? — Calculadora de fuerza gratis de BodyRank";

export default function OpenGraphImage() {
  const s = STRENGTH_STRINGS.es;
  return renderOgImage({
    eyebrow: s.eyebrow,
    title: "¿Qué tan fuerte soy?",
    footnote: "bodyrank.net/es/how-strong-am-i",
  });
}
