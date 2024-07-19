"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Loading from "@/app/[locale]/loading";
import TypingEffect from "@/lib/typing-effect";

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
            <TypingEffect text="Learn quicker." className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" />
            <p className="text-gray-500 text-xl md:text-2xl dark:text-gray-400">
              The first generative learning platform.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link href={!user ? `/api/auth/login` : `/home`}>
                <Button>
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