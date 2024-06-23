"use client";

import { SidebarItem } from "@/app/(dashboard)/_components/sidebar/sidebar-item";
import { BellIcon, CreditCardIcon, HistoryIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        icon: HomeIcon,
        label: "Home",
        href: "/home"
    },
    {
        icon: UserIcon,
        label: "Profile",
        href: "/profile"
    },
    {
        icon: BellIcon,
        label: "Notifications",
        href: "/notifications"
    },
    {
        icon: HistoryIcon,
        label: "History",
        href: "/history"
    },
    {
        icon: CreditCardIcon,
        label: "Billing",
        href: "/billing"
    },
    {
        icon: SettingsIcon,
        label: "Settings",
        href: "/settings"
    },
]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-full">
            {navLinks.map((navLink) => (
                <SidebarItem
                    key={navLink.href}
                    icon={navLink.icon}
                    label={navLink.label}
                    href={navLink.href}
                />
            ))}
        </div>
    )
}