"use client";

import { useState } from "react";
import Link from "next/link";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HomeIcon, SearchIcon, BellIcon, UserIcon, SettingsIcon, CircleHelpIcon, PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export default function AsideMenu({ onOpenOverlay, isOverlayOpen }: { onOpenOverlay: (tab: string) => void, isOverlayOpen: boolean }) {
    const [isAsideVisible, setIsAsideVisible] = useState(true);

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
                                        {!isOverlayOpen && <span>Home</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>Home</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        onClick={() => onOpenOverlay('search')}
                                        className="flex gap-2"
                                    >
                                        <SearchIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>Search</span>}
                                    </Button>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>Search</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => onOpenOverlay('notifications')}
                                        variant="ghost"
                                        className="flex items-center rounded-lg text-accent-foreground transition-colors hover:text-foreground p-2 gap-2"
                                    >
                                        <BellIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>Notifications</span>}
                                    </Button>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>Notifications</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/profile"
                                        className="flex items-center rounded-lg text-accent-foreground transition-colors hover:text-foreground p-2 gap-2"
                                        prefetch={false}
                                    >
                                        <UserIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>Profile</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>Profile</TooltipContent>}
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/settings"
                                        className="flex items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground p-2 gap-2"
                                        prefetch={false}
                                    >
                                        <SettingsIcon className="h-5 w-5" />
                                        {!isOverlayOpen && <span>Settings</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>Settings</TooltipContent>}
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
                                        {!isOverlayOpen && <span>Support</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isOverlayOpen && <TooltipContent>Support</TooltipContent>}
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                </aside>
            )}
        </>
    );
}
