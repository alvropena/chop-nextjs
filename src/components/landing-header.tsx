"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingHeader() {
    const router = useRouter();

    return (
        <header className="flex items-center justify-between px-4 lg:px-6 h-14 border-b">
            <Link href="/" className="flex items-center" prefetch={false}>
                <span className="ml-2 text-lg font-semibold">Chop Inc.</span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6">
                <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    About
                </Link>
                <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Pricing
                </Link>
                <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Blog
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Contact
                </Link>
                <Button variant="default" className="h-9 px-4 text-sm font-medium" onClick={() => router.push("/api/auth/login")}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                </Button>
            </nav>
        </header>
    )
}
