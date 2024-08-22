"use client";

import { useState } from "react";
import { HomeIcon, SearchIcon, BellIcon, UserIcon, SettingsIcon, CircleHelpIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Logo from "@/components/logo";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import SearchScreen from "@/app/[locale]/(dashboard)/(routes)/search/page";
import NavLink from "@/components/nav-link";
import { cn } from "@/lib/utils";

export default function AsideMenu() {
    const [isAsideVisible, setIsAsideVisible] = useState(true);
    const t = useTranslations("AsideMenu");
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const getLocalizedPath = (path: string) => `/${locale}${path}`;
    const isSearchActive = pathname === getLocalizedPath('/search');

    const baseClasses = "inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 justify-start";
    const activeClasses = "bg-primary text-primary-foreground";
    const hoverClasses = "hover:bg-secondary hover:text-secondary-foreground";
    const defaultClasses = "bg-transparent text-foreground";

    const searchButtonClasses = cn(
        baseClasses,
        isSearchActive ? activeClasses : defaultClasses,
        !isSearchActive && hoverClasses
    );

    return (
        <>
            {isAsideVisible && (
                <aside className="hidden w-56 flex-col border-r bg-background p-4 md:flex">
                    <nav className="flex flex-col gap-4">
                        <Logo />

                        <NavLink
                            href="/home"
                            icon={<HomeIcon className="h-5 w-5" />}
                            label={t("home")}
                        />

                        <Dialog>
                            <DialogTrigger asChild>
                                <button className={searchButtonClasses}>
                                    <SearchIcon className="h-5 w-5" />
                                    <span className="ml-2">{t("search")}</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <SearchScreen />
                            </DialogContent>
                        </Dialog>

                        <NavLink
                            href="/notifications"
                            icon={<BellIcon className="h-5 w-5" />}
                            label={t("notifications")}
                        />

                        <NavLink
                            href="/profile"
                            icon={<UserIcon className="h-5 w-5" />}
                            label={t("profile")}
                        />

                        <NavLink
                            href="/settings"
                            icon={<SettingsIcon className="h-5 w-5" />}
                            label={t("settings")}
                        />
                    </nav>
                </aside>
            )}
        </>
    );
}
