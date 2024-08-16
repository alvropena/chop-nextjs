"use client"

import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PricingPage() {
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
                <div className="mx-auto max-w-4xl space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Pricing</h1>
                        <p className="mt-4 text-muted-foreground">Choose the plan that's right for you.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
                            <h3 className="text-2xl font-bold">Individual</h3>
                            <p className="mt-4 text-muted-foreground">Ideal for solo users.</p>
                            <div className="mt-8">
                                <span className="text-4xl font-bold tracking-tight text-foreground">$12</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                            <Link
                                href="#"
                                className="mt-8 inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                prefetch={false}
                            >
                                Get Started
                            </Link>
                        </div>
                        <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
                            <h3 className="text-2xl font-bold">Family</h3>
                            <p className="mt-4 text-muted-foreground">Best for families of up to six members.</p>
                            <div className="mt-8">
                                <span className="text-4xl font-bold tracking-tight text-foreground">$24</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                            <Link
                                href="#"
                                className="mt-8 inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                prefetch={false}
                            >
                                Get Started
                            </Link>
                        </div>
                        <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
                            <h3 className="text-2xl font-bold">Enterprise</h3>
                            <p className="mt-4 text-muted-foreground">Tailored solutions for large businesses and organizations.</p>
                            <div className="mt-8">
                                <span className="text-4xl font-bold tracking-tight text-foreground">Let’s Talk</span>
                            </div>
                            <Link
                                href="#"
                                className="mt-8 inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                prefetch={false}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="flex flex-row items-center justify-center w-full p-6 border-t-2">
                <p className="text-sm">&copy; 2024 Chop Inc. All rights reserved.</p>
            </footer>
        </div >
    )
}
