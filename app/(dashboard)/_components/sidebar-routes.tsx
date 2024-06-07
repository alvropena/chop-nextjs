"use client";

import { SidebarItem } from "@/app/(dashboard)/_components/sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: "",
        label: "Dashboard",
        href: "/"
    },
    {
        icon: "",
        label: "Browse",
        href: "/search"
    },
]

const teacherRoutes = [
    {
        icon: "",
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: "",
        label: "Analytics",
        href: "/teacher/analytics"
    },
]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}

                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}