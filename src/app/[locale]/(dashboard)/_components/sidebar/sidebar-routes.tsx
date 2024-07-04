"use client";

import { SidebarItem } from '@/app/[locale]/(dashboard)/_components/sidebar/sidebar-item'
import { BellIcon, CreditCardIcon, HistoryIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/home",
  },
  {
    icon: UserIcon,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: BellIcon,
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: HistoryIcon,
    label: "History",
    href: "/history",
  },
  {
    icon: CreditCardIcon,
    label: "Billing",
    href: "/billing",
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    href: "/settings",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const t = useTranslations("");
  return (
    <div className="flex flex-col w-full">
      {navLinks.map((navLink) => {
        const label = navLink.label;
        console.log(label);
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