import { RootShell, rootMetadata, rootViewport } from "@/app/_pages/RootShell";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function SpanishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
