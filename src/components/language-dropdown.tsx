'use client'
import { capitalize } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

interface Option {
  country: string;
  code: string;
}

export default function LanguageDropdown() {
  const pathname = usePathname();
  const { setLang } = useSchemaStore((state) => state);
  const options: Option[] = [
    { country: "English", code: "en" },
    { country: "Español", code: "es" },
  ];

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <LanguagesIcon className='mr-2 h-4 w-4' /> Language
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((lang) => (
            <Link key={lang.code} href={`/${lang.code}/settings`}>
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
