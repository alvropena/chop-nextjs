import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { cn } from "../lib/utils";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

export default function NavLink({ href, icon, label, collapsed = false, tooltipSide = "top" }: NavLinkProps) {
  const pathname = usePathname(); // Use next-intl's usePathname

  const isActive = pathname === href;

  const baseClasses = "relative inline-flex items-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md";
  const activeClasses = "bg-primary text-primary-foreground";
  const hoverClasses = "hover:bg-secondary hover:text-secondary-foreground";
  const defaultClasses = "bg-transparent text-foreground";

  const linkClasses = cn(
    baseClasses,
    isActive ? activeClasses : defaultClasses,
    !isActive && hoverClasses,
    collapsed ? "justify-center w-full" : "justify-start px-3"
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={linkClasses} prefetch={false}>
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {icon}
              </div>
              {!collapsed && <span className="ml-2">{label}</span>}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
