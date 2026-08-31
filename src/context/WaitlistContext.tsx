"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type SubmitResult =
  | { ok: true; count: number }
  | { ok: false; error: "invalid" | "dupe" | "network"; count?: number };

interface WaitlistValue {
  count: number;
  submit: (email: string) => Promise<SubmitResult>;
}

const WaitlistContext = createContext<WaitlistValue | null>(null);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  // Load the real signup count once on mount.
  useEffect(() => {
    let active = true;
    fetch("/api/waitlist")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        /* count stays at 0 — non-fatal */
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = useCallback(async (email: string): Promise<SubmitResult> => {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setCount(data.count);
        return { ok: true, count: data.count };
      }
      if (typeof data.count === "number") {
        setCount(data.count);
      }
      const error = data.error === "dupe" ? "dupe" : "invalid";
      return { ok: false, error, count: data.count };
    } catch {
      return { ok: false, error: "network" };
    }
  }, []);

  const value = useMemo<WaitlistValue>(() => ({ count, submit }), [count, submit]);

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}

export function useWaitlist(): WaitlistValue {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return ctx;
}
