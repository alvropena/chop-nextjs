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

export function AvatarDropdownMenu() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    const logOutUser = async () => {
        try {
            const url = `http://${baseUrl}/api/v1/logout/`
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("accessToken");
            window.location.reload();
            return result;
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/alvropena.png" alt="@alvropena" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <a className="flex justify-between items-center w-full" href="/profile">
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </div>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <a className="flex justify-between items-center w-full" href="/history">
                            <div className="flex items-center">
                                <HistoryIcon className="mr-2 h-4 w-4" />
                                History
                            </div>
                            <DropdownMenuShortcut>⇧⌘J</DropdownMenuShortcut>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <a className="flex justify-between items-center w-full" href="/billing">
                            <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Billing
                            </div>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <a className="flex justify-between items-center w-full" href="/settings">
                            <div className="flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </div>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <a href="/api/auth/logout">Log out</a>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
