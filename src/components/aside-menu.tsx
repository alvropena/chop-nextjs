"use client";

import { useState } from "react";
import { HomeIcon, SearchIcon, BellIcon, UserIcon, SettingsIcon, CircleHelpIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Logo from "@/components/logo";
import { useTranslations } from "next-intl";
import SearchScreen from "@/app/[locale]/(dashboard)/(routes)/search/page";
import NavLink from "@/components/nav-link";

export default function AsideMenu({ onOpenOverlay, isOverlayOpen }: { onOpenOverlay: (tab: string) => void, isOverlayOpen: boolean }) {
    const [isAsideVisible, setIsAsideVisible] = useState(true);
    const t = useTranslations("AsideMenu");

    return (
        <>
            {isAsideVisible && (
                <aside className={`hidden ${isOverlayOpen ? 'w-20' : 'w-56'} flex-col border-r bg-background p-4 md:flex`}>
                    <nav className="flex flex-col gap-4">
                        <Logo />

                        <NavLink
                            href="/home"
                            icon={<HomeIcon className="h-5 w-5" />}
                            label={t("home")}
                            isOverlayOpen={isOverlayOpen}
                        />

                        <Dialog>
                            <DialogTrigger asChild>
                                <NavLink
                                    href="#"
                                    icon={<SearchIcon className="h-5 w-5" />}
                                    label={t("search")}
                                    isOverlayOpen={isOverlayOpen}
                                />
                            </DialogTrigger>
                            <DialogContent>
                                <SearchScreen />
                            </DialogContent>
                        </Dialog>

                        <NavLink
                            href="/notifications"
                            icon={<BellIcon className="h-5 w-5" />}
                            label={t("notifications")}
                            isOverlayOpen={isOverlayOpen}
                        />

                        <NavLink
                            href="/profile"
                            icon={<UserIcon className="h-5 w-5" />}
                            label={t("profile")}
                            isOverlayOpen={isOverlayOpen}
                        />

                        <NavLink
                            href="/settings"
                            icon={<SettingsIcon className="h-5 w-5" />}
                            label={t("settings")}
                            isOverlayOpen={isOverlayOpen}
                        />
                    </nav>

                    <nav className="mt-auto flex flex-col gap-4">
                        <NavLink
                            href="#"
                            icon={<CircleHelpIcon className="h-5 w-5" />}
                            label={t("support")}
                            isOverlayOpen={isOverlayOpen}
                        />
                    </nav>
                </aside>
            )}
        </>
    );
}
