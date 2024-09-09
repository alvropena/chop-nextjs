"use client";

import { useState, useEffect } from "react";
import { HomeIcon, SearchIcon, BellIcon, UserIcon, SettingsIcon, PanelLeftCloseIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import Logo from "./logo";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchScreen from "../app/[locale]/(dashboard)/search/page";
import NavLink from "./nav-link";
import { cn } from "../lib/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserProfileData } from "../data/user-profile/user-profile-data";

export default function AsideMenu({ }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("asideMenuCollapsed") || "false");
    }
    return false;
  });

  const t = useTranslations("AsideMenu");
  const pathname = usePathname();
  const { user } = useUser();
  // Simulating fetching the logged-in user
  function getLoggedInUser() {
    return UserProfileData[0];

  }
  const baseClasses =
    "relative inline-flex items-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md";
  const activeClasses = "bg-primary text-primary-foreground";
  const hoverClasses = "hover:bg-secondary hover:text-secondary-foreground";
  const defaultClasses = "bg-transparent text-foreground";
  const userProfile = getLoggedInUser(); // Get the "logged-in" user

  const searchButtonClasses = cn(
    baseClasses,
    pathname === '/search' ? activeClasses : defaultClasses,
    pathname !== '/search' && hoverClasses,
    isCollapsed ? "justify-center w-full" : "justify-start px-3 w-full"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("asideMenuCollapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  return (
    <aside className={cn("flex-col border-r bg-background p-4 transition-all duration-300", isCollapsed ? "w-16" : "w-56", "hidden sm:flex")}>
      <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between mb-4")}>
        {!isCollapsed && <Logo />}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={cn(isCollapsed && "flex justify-center w-full")}>
          <PanelLeftCloseIcon className={cn("h-5 w-5 text-foreground transition-transform", isCollapsed ? "rotate-180" : "")} />
        </button>
      </div>
      <nav className="flex flex-col gap-4 mt-4">
        <NavLink href="/home" icon={<HomeIcon className="h-5 w-5" />} label={t("home")} collapsed={isCollapsed} tooltipSide="right" />
        <Dialog>
          <DialogTrigger asChild>
            <button className={searchButtonClasses}>
              <SearchIcon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">{t("search")}</span>}
            </button>
          </DialogTrigger>
          <DialogContent>
            <SearchScreen />
          </DialogContent>
        </Dialog>
        <NavLink href="/notifications" icon={<BellIcon className="h-5 w-5" />} label={t("notifications")} collapsed={isCollapsed} tooltipSide="right" />
        {/* This NavLink will navigate to the user's profile based on their username */}
        <NavLink href={`/${userProfile.username}`} icon={<UserIcon className="h-5 w-5" />} label={t("profile")} collapsed={isCollapsed} tooltipSide="right" />


        <NavLink href="/settings" icon={<SettingsIcon className="h-5 w-5" />} label={t("settings")} collapsed={isCollapsed} tooltipSide="right" />
      </nav>
    </aside>
  );
}
