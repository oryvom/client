type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();
const duplicates = new Map<string, number>();

function windowMs() {
  const parsed = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
  if (!Number.isFinite(parsed) || parsed < 10_000) return 10 * 60 * 1000;
  return parsed;
}

function maxRequests() {
  const parsed = Number(process.env.RATE_LIMIT_MAX ?? 5);
  if (!Number.isFinite(parsed) || parsed < 1) return 5;
  return Math.floor(parsed);
}

function pruneBuckets(now: number) {
  if (buckets.size < 4000) return;
  for (const [key, value] of buckets) {
    if (value.reset < now) buckets.delete(key);
  }
}

function pruneDuplicates(now: number) {
  if (duplicates.size < 4000) return;
  for (const [key, value] of duplicates) {
    if (value < now) duplicates.delete(key);
  }
}

export function rateLimit(key: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  pruneBuckets(now);
  const current = buckets.get(key);
  if (!current || current.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs() });
    return { ok: true };
  }
  if (current.count >= maxRequests()) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((current.reset - now) / 1000)) };
  }
  current.count += 1;
  return { ok: true };
}

export function isDuplicate(key: string, ttlMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  pruneDuplicates(now);
  const expiry = duplicates.get(key);
  if (expiry && expiry > now) return true;
  duplicates.set(key, now + ttlMs);
  return false;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 80);
  }
  return request.headers.get("x-real-ip")?.slice(0, 80) || "unknown";
}

export function submissionTiming(startedAt: number): "ok" | "fast" | "invalid" {
  if (!Number.isFinite(startedAt)) return "invalid";
  const now = Date.now();
  if (startedAt > now + 30_000) return "invalid";
  if (now - startedAt < 1_500) return "fast";
  if (now - startedAt > 12 * 60 * 60 * 1000) return "invalid";
  return "ok";
}
