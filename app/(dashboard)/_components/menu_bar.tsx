"use client"

import { useState } from "react"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

export default function MenuBar() {
    const [activeMenu, setActiveMenu] = useState("home")
    const handleMenuClick = (menu: any) => {
        setActiveMenu(menu)
    }
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger
                    onClick={() => handleMenuClick("home")}
                    className={`${activeMenu === "home"
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                        } inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300`}
                >
                    For You
                </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger
                    onClick={() => handleMenuClick("about")}
                    className={`${activeMenu === "about"
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                        } inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300`}
                >
                    Following
                </MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}