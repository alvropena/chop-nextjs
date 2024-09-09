"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTranslations } from "next-intl";
import { Badge } from "../../../../components/ui/badge";

export default function BlogPage() {
    const t = useTranslations("BlogPage");

    return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("title")}
            </h1>
            <Badge variant="default" className="mt-4">
                {t("comingSoon")}
            </Badge>
            <p className="mt-4 text-muted-foreground">
                {t("subtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
        </main>
    );
}