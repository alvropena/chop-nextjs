"use client"

import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { useUser } from "@auth0/nextjs-auth0/client";


export function UserAvatar() {
    const { user, isLoading } = useUser();

    return (
        <div className="flex items-center gap-2">
            <Avatar className="items-center justify-center cursor-pointer border">
                <AvatarImage src={user?.picture || ''} alt={user?.name || ''} />
                <AvatarFallback>{user?.name?.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-sm">{user?.nickname}</p>
                <p className="text-sm">{user?.name}</p>
            </div>
        </div>
    )
}