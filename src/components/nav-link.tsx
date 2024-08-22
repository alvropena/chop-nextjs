import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isOverlayOpen: boolean;
}

export default function NavLink({ href, icon, label, isOverlayOpen }: NavLinkProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = pathname === href;

    // Tailwind CSS classes
    const baseClasses = "inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 justify-start";
    const activeClasses = "bg-black border text-white";
    const hoverClasses = "hover:bg-gray-800 hover:text-white";
    const defaultClasses = "bg-transparent text-black";

    const linkClasses = cn(
        baseClasses,
        isActive ? activeClasses : defaultClasses,
        hoverClasses
    );

    return (
        <TooltipProvider>
            <Tooltip>
        <TooltipTrigger asChild>
            <Link href={href} className={linkClasses} prefetch={false}>
                {icon}
                    {!isOverlayOpen && <span className="ml-2">{label}</span>}
                </Link>
                </TooltipTrigger>
                {isOverlayOpen && <TooltipContent>{label}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );
}
