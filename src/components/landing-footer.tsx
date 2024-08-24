import React from 'react';
import { useTranslations } from 'next-intl';

export default function LandingFooter() {
    const t = useTranslations("LandingFooter");

    return (
        <footer className="flex flex-row items-center justify-center w-full p-6 border-t border-gray-200">
            <p className="text-sm">&copy; 2024 {t("companyName")} {t("allRightsReserved")}</p>
        </footer>
    )
}
