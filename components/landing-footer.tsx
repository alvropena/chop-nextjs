"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function LandingFooter() {
    const t = useTranslations("LandingFooter");

    return (
        <footer className="flex flex-row items-center justify-between w-full  px-4 py-2 lg:px-8 h-16 border-t border-secondary">
            <p className="text-sm">&copy; 2024 {t("companyName")} {t("allRightsReserved")}</p>
            <button
                className="hover:cursor-pointer underline-offset-4 hover:underline text-sm"
                onClick={() => window.open("https://github.com/alvropena/chop-nextjs", "_blank", "noopener,noreferrer")}
            >
                {t("source")}
            </button>
        </footer>
    )
}