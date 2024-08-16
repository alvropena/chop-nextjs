"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation"

export default function AboutPage() {
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
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
                        <p className="mt-4 text-muted-foreground">
                            We are a small startup dedicated to building the first generative learning platform.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">

                        <div>
                            <h2 className="text-2xl font-semibold">Mission</h2>
                            <p className="mt-4 text-muted-foreground">
                                Our mission is to create products that solve real problems and improve people's lives. We believe in the
                                power of technology to make the world a better place.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">Vision</h2>
                            <p className="mt-4 text-muted-foreground">
                                Our mission is to create products that solve real problems and improve people's lives. We believe in the
                                power of technology to make the world a better place.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold">Team</h2>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="/placeholder.svg"
                                        width={64}
                                        height={64}
                                        alt="Alvaro Peña"
                                        className="rounded-full"
                                        style={{ aspectRatio: "64/64", objectFit: "cover" }}
                                    />
                                    <div>
                                        <p className="font-medium">Alvaro Peña</p>
                                        <p className="text-muted-foreground">Co-founder, CEO</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img
                                        src="/placeholder.svg"
                                        width={64}
                                        height={64}
                                        alt="Alonso Rojas"
                                        className="rounded-full"
                                        style={{ aspectRatio: "64/64", objectFit: "cover" }}
                                    />
                                    <div>
                                        <p className="font-medium">Alonso Rojas</p>
                                        <p className="text-muted-foreground">Co-founder, COO</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img
                                        src="/placeholder.svg"
                                        width={64}
                                        height={64}
                                        alt="César Chávez"
                                        className="rounded-full"
                                        style={{ aspectRatio: "64/64", objectFit: "cover" }}
                                    />
                                    <div>
                                        <p className="font-medium">César Chávez</p>
                                        <p className="text-muted-foreground">Co-founder, CTO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="flex flex-row items-center justify-center w-full p-6 border-t-2">
                <p className="text-sm">&copy; 2024 Chop Inc. All rights reserved.</p>
            </footer>
        </div>

    )
}