import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export default function NavLink({ href, icon, label }: NavLinkProps) {
    const pathname = usePathname();

    // Extract the locale from the current pathname
    const locale = pathname.split('/')[1];
    const getLocalizedPath = (path: string) => `/${locale}${path}`;

    // Determine if the current path is active
    const isActive = pathname === getLocalizedPath(href);

    // Tailwind CSS classes
    const baseClasses = "inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 justify-start";
    const activeClasses = "bg-primary text-primary-foreground";
    const hoverClasses = "hover:bg-secondary hover:text-secondary-foreground";
    const defaultClasses = "bg-transparent text-foreground";

    const linkClasses = cn(
        baseClasses,
        isActive ? activeClasses : defaultClasses,
        !isActive && hoverClasses
    );

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={getLocalizedPath(href)} className={linkClasses} prefetch={false}>
                        {icon}
                        <span className="ml-2">{label}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
