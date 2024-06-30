import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { UserStoreProvider } from "../providers/user-store-provider";
import { ZustandProvider } from "@/providers/zustand-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chop",
  description: "Learn quicker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ZustandProvider>
            <UserProvider>{children}</UserProvider>
          </ZustandProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}