"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

export default function PostHogPageView(): null {
  const pathname = usePathname(); // Get the current path from the URL
  const searchParams = useSearchParams(); // Get the search parameters from the URL
  const posthog = usePostHog(); // Get the PostHog instance from the context

  useEffect(() => {
    // Capture a pageview event whenever the pathname or search parameters change
    if (pathname && posthog) {
      let url = window.origin + pathname; // Construct the current URL
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`; // Append search parameters if they exist
      }
      // Capture the pageview event in PostHog
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]); // Dependencies for useEffect: run whenever these change

  return null; // This component doesn't render anything
}
