"use client";

import { ReactNode } from "react";
import { HomeIcon, UserIcon, HistoryIcon, CreditCardIcon, SettingsIcon, GlassesIcon, BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { AvatarDropdownMenu } from "./_components/avatar-dropdown-menu";
import { NotificationsDropdownMenu } from "./_components/notifications-dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    children: ReactNode;
    isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, children, isActive, ...props }) => {
    return (
        <Link href={href} prefetch={false} {...props} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${isActive
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
            : "text-gray-500 dark:text-gray-400"
            }`} >
            <Icon className="h-4 w-4" />
            {children}
        </Link>
    );
};

const navLinks = [
    { href: "/home", icon: HomeIcon, label: "Home" },
    { href: "/profile", icon: UserIcon, label: "Profile" },
    { href: "/notifications", icon: BellIcon, label: "Notifications" },
    { href: "/history", icon: HistoryIcon, label: "History" },
    { href: "/billing", icon: CreditCardIcon, label: "Billing" },
    { href: "/settings", icon: SettingsIcon, label: "Settings" },
];

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <html>
            <body>
                <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                        <div className="flex h-full max-h-screen flex-col gap-2">
                            <div className="flex h-[60px] items-center border-b px-6 justify-between">
                                <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                                    <GlassesIcon className="h-6 w-6" />
                                    <span>Chop</span>
                                </Link>
                                <Badge>
                                    Beta
                                </Badge>
                            </div>

                            <div className="flex-1 overflow-auto py-2">
                                <nav className="grid items-start px-4 text-sm font-medium">
                                    {navLinks.map(({ href, icon, label }) => (
                                        <NavLink
                                            key={href}
                                            href={href}
                                            icon={icon}
                                            isActive={pathname === href}
                                        >
                                            {label}
                                        </NavLink>
                                    ))}
                                </nav>
                            </div>
                            <div className="px-4 py-6">
                                <Button className="w-full">
                                    Invite people
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <header className="flex h-14 lg:h-[60px] items-center justify-end gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                            {/* <Button size={"sm"}>
                                Upgrade
                            </Button> */}
                            <NotificationsDropdownMenu />
                            <ModeToggle />
                            <AvatarDropdownMenu />
                        </header>
                        {children}
                    </div>
                </div>

            </body>
        </html>
    );
}
