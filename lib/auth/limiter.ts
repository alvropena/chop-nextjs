import { RateLimitError } from "@/server/error-handler";
import { getIp } from "./get-ip";

const PRUNE_INTERVAL = 60 * 1000; // 1 minute

export const DEFAULT_TIME_WINDOW = 10000 as const; //10 seconds

const trackers = new Map<
  string,
  {
    count: number;
    expiresAt: number;
  }
>();

function pruneTrackers() {
  const now = Date.now();

  for (const [key, value] of trackers.entries()) {
    if (value.expiresAt < now) {
      trackers.delete(key);
    }
  }
}

export async function rateLimitByKey({
  key = "global",
  limit = 1,
  window = DEFAULT_TIME_WINDOW,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  let tracker = trackers.get(key) || { count: 0, expiresAt: 0 };

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    throw new RateLimitError();
  }

  trackers.set(key, tracker);
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIp({
  key = "global",
  limit = 1,
  window = DEFAULT_TIME_WINDOW,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}
