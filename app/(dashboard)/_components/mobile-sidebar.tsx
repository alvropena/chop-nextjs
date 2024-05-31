import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarPage from "./sidebar";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SidebarPage />
            </SheetContent>
        </Sheet>
    )
}