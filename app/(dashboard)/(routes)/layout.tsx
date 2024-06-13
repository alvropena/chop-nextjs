import Navbar from "../_components/navbar";
import { HomeIcon, BellIcon, Package2Icon, ShoppingCartIcon, PackageIcon, UsersIcon, LineChartIcon, SearchIcon, CreditCardIcon, TimerIcon, HistoryIcon, SettingsIcon, Settings2Icon, Settings2, GlassesIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ReactNode } from "react";
import MenuBar from "../_components/menu_bar";

interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    children: ReactNode;
    className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, children, className, ...props }) => {
    return (
        <Link href={href} prefetch={false} {...props} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${className}`}>
            <Icon className="h-4 w-4" />
            {children}
        </Link>
    );
};

const navLinks = [
    { href: "/home", icon: HomeIcon, label: "Home" },
    { href: "/profile", icon: UserIcon, label: "Profile" },
    { href: "/history", icon: HistoryIcon, label: "History" },
    { href: "billing", icon: CreditCardIcon, label: "Billing", className: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" },
    { href: "/settings", icon: SettingsIcon, label: "Settings" },
];

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                        <div className="flex h-full max-h-screen flex-col gap-2">
                            <div className="flex h-[60px] items-center border-b px-6">
                                <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                                    <GlassesIcon className="h-6 w-6" />
                                    <span className="">Chop Inc</span>
                                </Link>
                                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                    <BellIcon className="h-4 w-4" />
                                    <span className="sr-only">Toggle notifications</span>
                                </Button>
                            </div>
                            <div className="flex-1 overflow-auto py-2">
                                <nav className="grid items-start px-4 text-sm font-medium">
                                    {navLinks.map(({ href, icon, label, className }) => (
                                        <NavLink key={href} href={href} icon={icon} className={className}>
                                            {label}
                                        </NavLink>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                            <Link href="#" className="lg:hidden" prefetch={false}>
                                <Package2Icon className="h-6 w-6" />
                                <span className="sr-only">Home</span>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                                    >
                                        <Image src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </header>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
