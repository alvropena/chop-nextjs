import Link from "next/link";
import { HomeIcon, SearchIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BottomTabNavigation({
  onOpenOverlay,
}: {
  onOpenOverlay: (tab: string) => void;
}) {
  const t = useTranslations("DashboardLayout");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-between border-t bg-background p-4 md:hidden">
      <Link href="/home" className="flex flex-col items-center justify-center">
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">{t("home")}</span>
      </Link>
      <button
        onClick={() => onOpenOverlay("search")}
        className="flex flex-col items-center justify-center"
      >
        <SearchIcon className="h-6 w-6" />
        <span className="text-xs">{t("search")}</span>
      </button>
      <Link href="/profile" className="flex flex-col items-center justify-center">
        <UserIcon className="h-6 w-6" />
        <span className="text-xs">{t("profile")}</span>
      </Link>
    </nav>
  );
}
