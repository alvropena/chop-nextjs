"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Initialize PostHog only if running in the browser
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST, // Set the PostHog API host
    person_profiles: "identified_only", // Track profiles only after they're identified
    capture_pageview: false, // Disable automatic pageview capture
  });
}

// PHProvider wraps the application with the PostHog context
export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
