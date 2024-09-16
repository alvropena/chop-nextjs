import { ThemeProvider } from "../../components/theme/theme-provider";
import type { Metadata } from "next";
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import { Inter } from "next/font/google";
import { Toaster } from "../../components/ui/toaster";
import "./globals.css";
// import { UserProvider as Auth0UserProvider } from '@auth0/nextjs-auth0/client';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PHProvider } from "./providers";
import dynamic from "next/dynamic";
import GoogleAdsense from "../../components/google-adsense";

// Import the new providers
import { NotificationsProvider } from "../../providers/notifications-provider";
import { UserProvider } from "../../providers/user-provider";
import { SearchProvider } from "../../providers/search-provider";
import { CardProvider } from "../../providers/card-provider";
import { CommunitiesProvider } from "../../providers/communities-provider"; // Import the CommunitiesProvider
import { ReactQueryProvider } from "../../providers/react-query-provider";

const PostHogPageView = dynamic(() => import("./posthog-page-view"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chop",
  description: "Learn quicker.",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" || locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <PHProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider
              locale={locale}
              messages={messages as AbstractIntlMessages}
            >
              <ReactQueryProvider>
                <UserProvider>
                  <NotificationsProvider>
                    <CardProvider>
                      <SearchProvider>
                        <CommunitiesProvider>
                          {" "}
                          {/* CommunitiesProvider wrapping necessary components */}
                          <PostHogPageView />
                          {children}
                          <GoogleAdsense pId="（AdsenseのID）" />
                          <Analytics mode={"production"} />
                          <SpeedInsights />
                        </CommunitiesProvider>
                      </SearchProvider>
                    </CardProvider>
                  </NotificationsProvider>
                </UserProvider>
              </ReactQueryProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </PHProvider>
    </html>
  );
}
