"use client";

import { SidebarItem } from '@/app/[locale]/(dashboard)/_components/sidebar/sidebar-item'
import { navLinks } from "@/data/nav-links";
import {
  BellIcon,
  CreditCardIcon,
  HistoryIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";


export const SidebarRoutes = () => {
  const pathname = usePathname();
  const t = useTranslations("");
  return (
    <div className="flex flex-col w-full">
      {navLinks.map((navLink) => {
        const label = navLink.label;
        return (
          <SidebarItem
            key={navLink.href}
            icon={navLink.icon}
            label={t(navLink.label.toString())}
            href={navLink.href}
          />
        );
      })}
    </div>
  );
};