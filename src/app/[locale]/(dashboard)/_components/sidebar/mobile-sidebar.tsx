import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarPage from "./sidebar";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Button size={"icon"} variant={"outline"}>
                    <MenuIcon size={"16"} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SidebarPage />
            </SheetContent>
        </Sheet>
    )
}