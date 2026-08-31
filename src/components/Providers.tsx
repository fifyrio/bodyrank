"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { WaitlistProvider } from "@/context/WaitlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <WaitlistProvider>{children}</WaitlistProvider>
    </LanguageProvider>
  );
}
