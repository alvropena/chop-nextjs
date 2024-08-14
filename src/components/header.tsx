import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTranslations } from "next-intl";
import LanguageCombobox from "./language-combobox";
import { AvatarDropdownMenu } from "./avatar-dropdown-menu";

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  const t = useTranslations("");
  return (
    <header className="flex flex-row items-center justify-between">
      <Logo />
      <div className="flex flex-row items-center gap-4">
        <LanguageCombobox />
        <ModeToggle />
        {!user ? (
          <Button
            className="gap-2"
            onClick={() => {
              router.push("/api/auth/login");
            }}
          >
            <LogIn className="h-4 w-4" />
            {t("Log_in")}
          </Button>
        ) : (
          // <Button
          //   className="gap-2"
          //   onClick={() => {
          //     router.push("/api/auth/logout");
          //   }}
          // >
          //   <LogIn className="h-4 w-4" />
          //   {t("Log_out")}
          // </Button>
          <AvatarDropdownMenu />
        )
        }
      </div>
    </header>
  );
}
