import Link from "next/link";
import { NavLinkProps } from "@/types/navlink";

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon: Icon,
  children,
  isActive,
  lang,
  ...props
}) => {
  return (
    <Link
      lang={lang}
      href={href}
      prefetch={false}
      {...props}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${isActive
        //? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
        //: "text-gray-500 dark:text-gray-400"
        }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

export default NavLink;
