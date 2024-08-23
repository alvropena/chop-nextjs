"use client";

import { usePathname } from 'next/navigation';

export default function useLocalePath() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  return { locale, getLocalizedPath };
}
