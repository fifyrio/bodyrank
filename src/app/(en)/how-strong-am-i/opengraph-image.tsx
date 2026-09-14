import { ogContentType, ogSize, renderOgImage } from "@/app/_pages/og";
import { STRENGTH_STRINGS } from "@/lib/strength/i18n";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "How strong am I? — BodyRank free strength calculator";

export default function OpenGraphImage() {
  const s = STRENGTH_STRINGS.en;
  return renderOgImage({
    eyebrow: s.eyebrow,
    title: "How strong am I?",
    footnote: "bodyrank.net/how-strong-am-i",
  });
}
