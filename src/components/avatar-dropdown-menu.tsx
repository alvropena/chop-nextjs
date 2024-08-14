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
    SettingsIcon,
    TimerIcon,
    User,
    UserIcon,
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
                    <AvatarImage src={user?.picture || ''} alt={user?.name || ''} />
                    <AvatarFallback>{user?.name?.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup> 
                <DropdownMenuSeparator /> */}
                <Link href="/api/auth/logout">
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <p>Log out</p>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}