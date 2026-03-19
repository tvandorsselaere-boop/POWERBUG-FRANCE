/**
 * Simple in-memory rate limiter for Vercel serverless functions.
 * Uses a sliding window per IP. Resets on cold start (acceptable for small sites).
 */

const store = new Map<string, number[]>();

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of store) {
    const filtered = timestamps.filter((t) => now - t < 120_000);
    if (filtered.length === 0) {
      store.delete(key);
    } else {
      store.set(key, filtered);
    }
  }
}, 300_000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/**
 * Check if a request is allowed under the rate limit.
 * @param key - Unique identifier (usually IP + route)
 * @param maxRequests - Max requests allowed in the window
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const timestamps = store.get(key) ?? [];

  // Remove entries outside the window
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    store.set(key, valid);
    return { allowed: false, remaining: 0 };
  }

  valid.push(now);
  store.set(key, valid);
  return { allowed: true, remaining: maxRequests - valid.length };
}

/** Extract client IP from Next.js request headers */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
