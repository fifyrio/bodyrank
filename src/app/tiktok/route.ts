import { NextResponse } from "next/server";
import { incrementCounter } from "@/lib/counterStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COUNTER = "tiktok";

// Referral landing link for TikTok traffic.
// Records the click, then forwards the visitor to the homepage.
// Share this as: https://<your-domain>/tiktok
export async function GET(request: Request) {
  try {
    await incrementCounter(COUNTER);
  } catch {
    // Never block the redirect on a tracking failure.
  }

  const target = new URL("/", request.url);
  target.searchParams.set("ref", "tiktok");

  // 302: temporary redirect, not cached by clients so every visit is counted.
  return NextResponse.redirect(target, 302);
}
