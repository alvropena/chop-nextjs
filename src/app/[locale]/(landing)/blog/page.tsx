"use client"

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogIn } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function BlogPage() {
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
            <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <Link href="#" className="block" prefetch={false}>
                            <img
                                src="/placeholder.svg"
                                width={600}
                                height={400}
                                alt="Blog Post Image"
                                className="w-full h-48 object-cover"
                                style={{ aspectRatio: "600/400", objectFit: "cover" }}
                            />
                        </Link>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                                <Link href="#" className="hover:underline" prefetch={false}>
                                    Unlocking the Secrets of Successful Startups
                                </Link>
                            </h2>
                            <p className="text-muted-foreground line-clamp-3">
                                Discover the key strategies and insights that have propelled the most innovative startups to success.
                                From funding to scaling, this blog post covers it all.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <footer className="flex flex-row items-center justify-center w-full p-6 border-t-2">
                <p className="text-sm">&copy; 2024 Chop Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}
