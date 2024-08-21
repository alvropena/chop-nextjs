"use client";

import { useState } from "react";
import Link from "next/link";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HomeIcon, SearchIcon, BellIcon, UserIcon, SettingsIcon, CircleHelpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useTranslations } from "next-intl";

export default function AsideMenu({ onOpenOverlay, isOverlayOpen }: { onOpenOverlay: (tab: string) => void, isOverlayOpen: boolean }) {
    const [isAsideVisible, setIsAsideVisible] = useState(true);
    const t = useTranslations("AsideMenu");

    const toggleAsideVisibility = () => {
        setIsAsideVisible(!isAsideVisible);
    };

    return (
        <>
            {isAsideVisible && (
                <aside className={`hidden ${isOverlayOpen ? 'w-20' : 'w-56'} flex-col border-r bg-background p-4 md:flex`}>
                    <nav className="flex flex-col gap-4">
                        <Logo />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/home"
                                        className="flex items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground p-2 gap-2"
                                        prefetch={false}
                                    >
                                        <HomeIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>{t("home")}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>{t("home")}</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        onClick={() => onOpenOverlay('search')}
                                        className="flex gap-2"
                                    >
                                        <SearchIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>{t("search")}</span>}
                                    </Button>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>{t("search")}</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => onOpenOverlay('notifications')}
                                        variant="ghost"
                                        className="flex items-center rounded-lg text-accent-foreground transition-colors hover:text-foreground p-2 gap-2"
                                    >
                                        <BellIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>{t("notifications")}</span>}
                                    </Button>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>{t("notifications")}</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/profile"
                                        className="flex items-center rounded-lg text-accent-foreground transition-colors hover:text-foreground p-2 gap-2"
                                        prefetch={false}
                                    >
                                        <UserIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>{t("profile")}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>{t("profile")}</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/settings"
                                        className="flex items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground p-2 gap-2"
                                        prefetch={false}
                                    >
                                        <SettingsIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>{t("settings")}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>{t("settings")}</TooltipContent>}
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                    <nav className="mt-auto flex flex-col gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        className="flex items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                        prefetch={false}
                                    >
                                        <CircleHelpIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>{t("support")}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>{t("support")}</TooltipContent>}
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                </aside>
            )}
        </>
    );
}
