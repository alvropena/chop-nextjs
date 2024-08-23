import Link from "next/link";
import { BellIcon, HomeIcon, SearchIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from 'next/navigation';

export default function BottomTabNavigation({
  onOpenOverlay,
}: {
  onOpenOverlay: (tab: string) => void;
}) {
  const t = useTranslations("DashboardLayout");

  // Inline useLocalePath logic
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  const isActive = (path: string) => pathname === getLocalizedPath(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center border-t bg-background p-4 md:hidden">
      <Link href={getLocalizedPath('/home')} className="flex flex-col items-center justify-center">
        <HomeIcon
          color={isActive("/home") ? "#000000" : "#A9A9A9"}
          className="h-7 w-7"
        />
      </Link>
      <Link href={getLocalizedPath('/search')} className="flex flex-col items-center justify-center">
        <SearchIcon
          color={isActive("/search") ? "#000000" : "#A9A9A9"}
          className="h-7 w-7"
        />
      </Link>
      <Link
        href={getLocalizedPath('/notifications')}
        className="relative flex flex-col items-center justify-center"
      >
        <BellIcon
          color={isActive("/notifications") ? "#000000" : "#A9A9A9"}
          className="h-7 w-7"
        />
        <span className="absolute bottom-4 left-3 text-xs text-white bg-red-600 h-5 w-5 rounded-full flex items-center justify-center">
          2
        </span>
      </Link>
      <Link href={getLocalizedPath('/profile')} className="flex flex-col items-center justify-center">
        <UserIcon
          color={isActive("/profile") ? "#000000" : "#A9A9A9"}
          className="h-7 w-7"
        />
      </Link>
    </nav>
  );
}
