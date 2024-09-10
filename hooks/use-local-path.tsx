"use client";

import { usePathname } from 'next/navigation';

export default function useLocalePath() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];  // Extract the locale from the path

  const getLocalizedPath = (path: string) => {
    // Ensure path starts with a slash
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  };

  return { locale, getLocalizedPath };
}
