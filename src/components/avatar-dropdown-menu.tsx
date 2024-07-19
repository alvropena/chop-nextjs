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

export function AvatarDropdownMenu() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const { user, isLoading } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="items-center justify-center cursor-pointer border">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>{user?.name?.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/*     <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                */}
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <a href="/api/auth/logout">Log out</a>
                    {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
