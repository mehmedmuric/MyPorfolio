// lib/rateLimit.ts
type RateLimitConfig = {
  windowMs: number; // vremenski prozor u ms (npr. 60 sekundi)
  max: number;      // max requesta po IP u tom prozoru
};

const ipStore = new Map<string, { count: number; firstRequest: number }>();

export function rateLimit(config: RateLimitConfig) {
  return (ip: string) => {
    const now = Date.now();
    const entry = ipStore.get(ip);

    if (!entry) {
      ipStore.set(ip, { count: 1, firstRequest: now });
      return { success: true };
    }

    const elapsed = now - entry.firstRequest;

    if (elapsed > config.windowMs) {
      // resetujemo prozor
      ipStore.set(ip, { count: 1, firstRequest: now });
      return { success: true };
    }

    if (entry.count < config.max) {
      entry.count++;
      ipStore.set(ip, entry);
      return { success: true };
    }

    return {
      success: false,
      retryAfter: Math.ceil((config.windowMs - elapsed) / 1000), // u sekundama
    };
  };
}
