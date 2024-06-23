"use client";

import { AvatarDropdownMenu } from "@/app/(dashboard)/_components/avatar-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";


export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="flex gap-x-2 ml-auto">
        </div>
    )
}