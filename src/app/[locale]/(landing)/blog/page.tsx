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
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 lg:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Blog
            </h1>
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
    )
}
