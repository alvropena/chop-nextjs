'use client'
import { capitalize } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React from 'react'
import { Button } from '@/components/ui/button'
import { useSchemaStore } from "@/providers/schema-store-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguagesIcon } from 'lucide-react'
import { useTranslations } from "next-intl";

interface Option {
  country: string;
  code: string;
}

export default function LanguageDropdown() {
  const { setLang } = useSchemaStore((state) => state);
  const options: Option[] = [
    { country: "English", code: "en" },
    { country: "Español", code: "es" },
  ];
  const t = useTranslations("");
  const router = useRouter();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"outline"}>
            <LanguagesIcon className="mr-2 h-4 w-4" /> {t("Language")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}/settings`}
              onClick={() => router.refresh()}
            >
              <DropdownMenuItem
                lang={lang.code}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setLang(lang.code as "en" | "es");
                }}
              >
                {capitalize(lang.country)}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
