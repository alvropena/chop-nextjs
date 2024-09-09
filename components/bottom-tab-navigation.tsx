import { BellIcon, HomeIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import NavLink from "./nav-link"; // Import NavLink

export default function BottomTabNavigation({ isBottomTab = false }: { isBottomTab?: boolean }) {
  const t = useTranslations("DashboardLayout");

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center border-t bg-background p-4 md:hidden">
      <NavLink href='/home' icon={<HomeIcon />} label={t('home')} isBottomTab={isBottomTab} />
      <NavLink href='/search' icon={<SearchIcon />} label={t('search')} isBottomTab={isBottomTab} />
      <NavLink href='/notifications' icon={<BellIcon />} label={t('notifications')} isBottomTab={isBottomTab} />
      <NavLink href='/profile' icon={<UserIcon />} label={t('profile')} isBottomTab={isBottomTab} />
      {/* <NavLink href='/settings' icon={<SettingsIcon />} label={t('settings')} isBottomTab={isBottomTab} /> */}
    </footer>
  );
}