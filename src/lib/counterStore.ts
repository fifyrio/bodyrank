import { promises as fs } from "node:fs";
import path from "node:path";

// Simple file-backed counter with per-day buckets, for referral / campaign tracking.
// Intentionally minimal for a single-instance deployment — swap for a database or
// an analytics provider before scaling horizontally.

const DATA_DIR = path.join(process.cwd(), "data");

export interface CounterStore {
  count: number;
  byDay: Record<string, number>;
}

function fileFor(name: string): string {
  // Guard against path traversal — only allow a plain slug.
  if (!/^[a-z0-9_-]+$/i.test(name)) {
    throw new Error(`Invalid counter name: ${name}`);
  }
  return path.join(DATA_DIR, `${name}.json`);
}

function today(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

export async function readCounter(name: string): Promise<CounterStore> {
  try {
    const raw = await fs.readFile(fileFor(name), "utf8");
    const parsed = JSON.parse(raw) as Partial<CounterStore>;
    return {
      count: typeof parsed.count === "number" ? parsed.count : 0,
      byDay: parsed.byDay && typeof parsed.byDay === "object" ? parsed.byDay : {},
    };
  } catch {
    return { count: 0, byDay: {} };
  }
}

export async function incrementCounter(name: string): Promise<CounterStore> {
  const store = await readCounter(name);
  const day = today();
  const next: CounterStore = {
    count: store.count + 1,
    byDay: { ...store.byDay, [day]: (store.byDay[day] ?? 0) + 1 },
  };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(fileFor(name), JSON.stringify(next, null, 2), "utf8");
  return next;
}
