import { NextResponse } from "next/server";
import { readCounter } from "@/lib/counterStore";

export const runtime = "nodejs";

// Read-only stats for TikTok referral traffic: total clicks + per-day breakdown.
export async function GET() {
  const store = await readCounter("tiktok");
  return NextResponse.json({ count: store.count, byDay: store.byDay });
}
