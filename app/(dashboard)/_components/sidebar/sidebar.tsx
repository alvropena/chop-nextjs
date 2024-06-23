import { Logo } from "@/app/(dashboard)/_components/logo";
import { SidebarRoutes } from "@/app/(dashboard)/_components/sidebar/sidebar-routes";

const SidebarPage = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}

export default SidebarPage;