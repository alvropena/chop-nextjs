"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-4 lg:px-6 h-14 border-b">
        <Link href="/" className="flex items-center" prefetch={false}>
          <span className="ml-2 text-lg font-semibold">Chop Inc.</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Blog
          </Link>
          <Button variant="default" className="h-9 px-4 text-sm font-medium" onClick={() => router.push("/api/auth/login")}>
            <LogIn className="h-4 w-4 mr-2" />
            Log In
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-bold">
          The first generative learning platform.
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn any topic playing, just type it.
        </p>
        <Button className="" size="lg">Get Started</Button>
      </main>
      <footer className="flex flex-row items-center justify-center w-full p-6 border-t-2">
        <p className="text-sm">&copy; 2024 Chop Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}