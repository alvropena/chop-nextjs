"use client"

import {
    Cloud,
    CreditCard,
    Github,
    HistoryIcon,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    TimerIcon,
    User,
    UserPlus,
    Users,
} from "lucide-react"
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@auth0/nextjs-auth0/client";
import { Switch } from "@/components/ui/switch"; // Ensure correct import path
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes"; // Import useTheme

export function AvatarDropdownMenu() {
    const { user, isLoading } = useUser();
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark";

    const handleToggle = () => {
        setTheme(isDarkMode ? "light" : "dark");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="items-center justify-center cursor-pointer border">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>{user?.name?.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between items-center">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleToggle} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/api/auth/logout">
                    <DropdownMenuItem className="cursor-pointer justify-center">
                        <LogOut className="mr-2 h-5 w-5" />
                        <p>Log out</p>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}