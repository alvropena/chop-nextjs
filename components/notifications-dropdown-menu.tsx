import {
    Bell,
    Mail,
    MessageSquare,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { BellIcon } from "lucide-react";
import Link from "next/link";

export function NotificationsDropdownMenu() {
    const notifications = [
        { id: 1, icon: Mail, message: "New email from John Doe" },
        { id: 2, icon: MessageSquare, message: "New comment on your post" },
        { id: 3, icon: Bell, message: "System update available" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <BellIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id}>
                            <notification.icon className="mr-2 h-4 w-4" />
                            <span>{notification.message}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="items-center justify-center">
                    <Link href="/notifications">View all notifications</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
