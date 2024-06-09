import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { Logo } from "./logo";

const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center shadow-sm">
            <Logo />
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    );
}

export default Navbar;