// Shared Open Graph / Twitter card image, rendered at build time by next/og.
// Each route's opengraph-image.tsx supplies its own language and copy.

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgImageInput {
  eyebrow: string;
  title: string;
  footnote: string;
}

export function renderOgImage({ eyebrow, title, footnote }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          background: "#08080a",
          color: "#f4f3f6",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#22d3ee" }}>
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 132, height: 8, background: "#8b5cf6", marginBottom: 32 }} />
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, lineHeight: 1.06, maxWidth: 940 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <div style={{ display: "flex", fontWeight: 700, letterSpacing: 6 }}>BODYRANK</div>
          <div style={{ display: "flex", color: "#98959f" }}>{footnote}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
