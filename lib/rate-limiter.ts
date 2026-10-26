/**
 * In-memory rolling-window rate limiter & brute-force defense.
 * Tracks client IP addresses and enforces lockout windows.
 */

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

class SecurityRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private readonly cleanupInterval = 5 * 60 * 1000; // clean every 5 mins

  constructor() {
    // Periodically remove expired records to prevent memory leak
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.cleanup(), this.cleanupInterval);
    }
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, rec] of this.records.entries()) {
      if (rec.lockedUntil && rec.lockedUntil < now) {
        this.records.delete(key);
      } else if (now - rec.firstAttempt > 60 * 60 * 1000) {
        this.records.delete(key);
      }
    }
  }

  /**
   * Checks if an IP or identifier is currently rate limited or locked out.
   * @param key Unique client identifier (e.g. IP + action)
   * @param maxAttempts Max allowed attempts within the window
   * @param windowMs Time window in milliseconds
   * @param lockoutMs Lockout duration in milliseconds if exceeded
   */
  public checkLimit(
    key: string,
    maxAttempts = 5,
    windowMs = 15 * 60 * 1000,
    lockoutMs = 15 * 60 * 1000
  ): { allowed: boolean; remaining: number; retryAfterSeconds?: number } {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record) {
      return { allowed: true, remaining: maxAttempts };
    }

    // Check if currently locked out
    if (record.lockedUntil && record.lockedUntil > now) {
      const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    // Check if the window has expired
    if (now - record.firstAttempt > windowMs) {
      this.records.delete(key);
      return { allowed: true, remaining: maxAttempts };
    }

    if (record.count >= maxAttempts) {
      // Lock them out
      record.lockedUntil = now + lockoutMs;
      const retryAfterSeconds = Math.ceil(lockoutMs / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    return { allowed: true, remaining: maxAttempts - record.count };
  }

  /**
   * Records a failed attempt for an identifier.
   */
  public recordFailure(
    key: string,
    maxAttempts = 5,
    lockoutMs = 15 * 60 * 1000
  ): { locked: boolean; remaining: number; retryAfterSeconds?: number } {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record) {
      this.records.set(key, { count: 1, firstAttempt: now });
      return { locked: false, remaining: maxAttempts - 1 };
    }

    record.count += 1;
    if (record.count >= maxAttempts) {
      record.lockedUntil = now + lockoutMs;
      const retryAfterSeconds = Math.ceil(lockoutMs / 1000);
      return { locked: true, remaining: 0, retryAfterSeconds };
    }

    return { locked: false, remaining: maxAttempts - record.count };
  }

  /**
   * Tracks a successful submission against a rate limit window (e.g. contact forms).
   */
  public recordSubmission(
    key: string,
    maxLimit = 20,
    windowMs = 10 * 60 * 1000
  ): { limited: boolean; remaining: number } {
    const now = Date.now();
    const record = this.records.get(key);

    if (!record || now - record.firstAttempt > windowMs) {
      this.records.set(key, { count: 1, firstAttempt: now });
      return { limited: false, remaining: maxLimit - 1 };
    }

    record.count += 1;
    if (record.count >= maxLimit) {
      record.lockedUntil = now + windowMs;
      return { limited: true, remaining: 0 };
    }

    return { limited: false, remaining: maxLimit - record.count };
  }

  /**
   * Resets the record upon successful authentication.
   */
  public reset(key: string) {
    this.records.delete(key);
  }
}

// Global singleton rate limiter instance
export const rateLimiter = new SecurityRateLimiter();

/**
 * Extracts a robust client IP from headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  return "127.0.0.1";
}
