import { ThemeProvider } from '@/app/[locale]/components/ThemeProvider'
import type { Metadata } from 'next'
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl'
import { Inter, Rubik, Space_Grotesk } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Header } from './components/Header'
import './globals.css'
import { ZustandProvider } from '@/providers/zustand-provider'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
})
const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chop',
  description: 'Learn quicker.'
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()
  return (
    <html
      lang={locale}
      dir={locale === "ar" || locale == "fa" ? "rtl" : "ltr"}
      className={`${space_grotesk.variable} ${rubik.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          themes={["light", "dark"]}
        >
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            <ZustandProvider>
              <NextTopLoader
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                color="var(--primary)"
                showSpinner={false}
              />

              <UserProvider>
                {children}
                <Analytics mode={"production"} />
                <SpeedInsights />
              </UserProvider>
            </ZustandProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
