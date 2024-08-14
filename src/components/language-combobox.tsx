'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { LanguagesIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn, capitalize } from '@/lib/utils';
import { useSchemaStore } from '@/providers/schema-store-provider';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const languages = [
  {
    country: 'English',
    code: 'en',
  },
  {
    country: 'Español',
    code: 'es',
  },
];

export default function LanguageCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { setLang } = useSchemaStore((state) => state);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <LanguagesIcon className="mr-2 h-4 w-4" />
          {value
            ? languages.find((lang) => lang.code === value)?.country
            : 'Select language...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/${lang.code}/`}
                  onClick={() => router.refresh()}
                >
                  <CommandItem
                    value={lang.code}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setLang(lang.code as 'en' | 'es');
                      setOpen(false);
                    }}
                  >
                    {capitalize(lang.country)}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === lang.code ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
