"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useTranslations } from 'next-intl';

export default function LandingHeader() {
    const router = useRouter();
    const t = useTranslations("LandingHeader");

    return (
        <header className="flex items-center justify-between px-4 py-2 lg:px-8 h-16 border-b border-gray-200">
            {/* Chop Inc. logo or title */}
            <Link href="/" className="flex items-center" prefetch={false}>
                <span className="ml-2 text-lg font-semibold">{t("companyName")}</span>
            </Link>

            {/* Navigation links for large screens */}
            <nav className="hidden md:flex items-center gap-6">
                <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    {t("about")}
                </Link>
                <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    {t("pricing")}
                </Link>
                <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    {t("blog")}
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    {t("contact")}
                </Link>
            </nav>

            <div className="flex items-center gap-4">
                {/* Log In button for large screens */}
                <Button
                    variant="default"
                    className="hidden md:flex h-9 px-4 text-sm font-medium"
                    onClick={() => router.push("/api/auth/login")}
                >
                    <LogIn className="h-4 w-4 mr-2" />
                    {t("login")}
                </Button>

                {/* For small screens: Log In button and MenuIcon */}
                <div className="flex md:hidden items-center gap-2">
                    <Button
                        variant="default"
                        className="h-10 px-4 text-sm font-medium"
                        onClick={() => router.push("/api/auth/login")}
                    >
                        <LogIn className="h-5 w-4 mr-2" />
                        {t("login")}
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="md:hidden">
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">{t("toggleMenu")}</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="md:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    {t("about")}
                                </Link>
                                <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    {t("pricing")}
                                </Link>
                                <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    {t("blog")}
                                </Link>
                                <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                    {t("contact")}
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
