import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("");
  return (
    <footer className="flex flex-row justify-between items-center">
      <Badge>Beta</Badge>
      <p className="text-xs text-gray-500">
        {t("Chop_can_make_mistakes_Check_important_info")}
      </p>
      {/* <Button
                onClick={() =>
                    window.open("https://github.com/alvropena/chop-nextjs.git", "_blank")
                }
                variant="link"
                className="text-xs"
            >
                Source
            </Button> */}
    </footer>
  );
}
