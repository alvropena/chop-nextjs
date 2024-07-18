"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/app/[locale]/(dashboard)/_components/footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Loading from "@/app/[locale]/loading";

export default function AuthPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();


  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return (
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link
            href="#"
            className="flex items-center justify-center"
            prefetch={false}
          >
            <span className="">Chop</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href={"/api/auth/login"}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex flex-col justify-center items-center text-center py-12 md:py-24 lg:py-32 border-b">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Learn quicker.
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl dark:text-gray-400">
              The first generative learning platform.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link href={!user ? `/api/auth/login` : `/home`}>
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } else {
    return router.push("/home");
  }

};