import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { navLinks } from "@/data/nav-links";
import { usePathname } from "next/navigation";
import { GlassesIcon } from "lucide-react";
import { InviteFriendsDialog } from "../invite-friends-dialog";
import { FC } from "react";
import { useTranslations } from "next-intl";
import NavLink from "./navlink";

interface Props {
  locale: string;
}

const Navbar: FC<Props> = ({ locale }) => {
  const pathname = usePathname();
  const t = useTranslations("");
  return (
    <>
      <div className="flex h-[60px] items-center justify-between border-b px-6">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <GlassesIcon className="h-6 w-6" />
          <span>Chop</span>
        </Link>
        <Badge>Beta</Badge>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navLinks.map(({ href, icon, label }) => (
            <NavLink
              key={href}
              lang={locale}
              href={href}
              icon={icon}
              isActive={pathname === href}
            >
              {t(label.toString())}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className=" px-6 py-6">
        <InviteFriendsDialog />
      </div>
    </>
  );
};

export default Navbar;