import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

// Deliberately simple, RFC-pragmatic email check. Server is the source of truth.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistStore {
  count: number;
  entries: string[];
}

async function readStore(): Promise<WaitlistStore> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<WaitlistStore>;
    return {
      count: typeof parsed.count === "number" ? parsed.count : 0,
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch {
    return { count: 0, entries: [] };
  }
}

async function writeStore(store: WaitlistStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function GET() {
  const store = await readStore();
  return NextResponse.json({ count: store.count });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email).trim().toLowerCase()
      : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const store = await readStore();

  if (store.entries.includes(email)) {
    return NextResponse.json(
      { ok: false, error: "dupe", count: store.count },
      { status: 409 },
    );
  }

  const next: WaitlistStore = {
    count: store.count + 1,
    entries: [...store.entries, email],
  };
  await writeStore(next);

  return NextResponse.json({ ok: true, count: next.count });
}
