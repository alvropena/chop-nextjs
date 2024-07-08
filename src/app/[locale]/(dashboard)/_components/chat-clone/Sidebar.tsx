import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import NavLink from "../sidebar/navlink";
import { navLinks } from "@/data/nav-links";
import { InviteFriendsDialog } from "../invite-friends-dialog";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { GlassesIcon } from "lucide-react";

interface Props {
  locale: string;
}
const Sidebara: React.FC<Props> = ({ locale }) => {
  const pathname = usePathname();
  const t = useTranslations("");
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20 ">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <div className="flex h-[52px] items-center justify-between border-b px-6">
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
        <div className="px-4 py-6">
          <InviteFriendsDialog />
        </div>
      </nav>
    </div>
  );
};

export default Sidebara;
