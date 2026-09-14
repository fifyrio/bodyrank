// Shared <html> shell for the per-language root layouts in (en) and (es).
// Two root layouts let each language server-render its own <html lang>.

import type { Metadata, Viewport } from "next";
import { Anton, Sora, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { STRINGS, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import "@/styles/globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-src",
});

const sora = Sora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-src",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-src",
});

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080a",
};

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={STRINGS[lang].htmllang} className={`${anton.variable} ${sora.variable} ${plexMono.variable}`}>
      <body>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
