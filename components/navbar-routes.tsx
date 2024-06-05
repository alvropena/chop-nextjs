"use client";

import { AvatarDropdownMenu } from "@/app/(dashboard)/_components/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";


export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="flex gap-x-2 ml-auto">
            <AvatarDropdownMenu />
        </div>
    )
}