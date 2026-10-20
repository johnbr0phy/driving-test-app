"use client";

import { useState } from "react";
import Link from "next/link";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslation } from "@/contexts/LanguageContext";
import { LANGUAGES, type Language } from "@/i18n";

/**
 * Language picker. A row of flags stopped scaling once we passed three
 * languages, so this collapses to a single trigger and lists the options in a
 * popover — the width stays constant no matter how many languages we add.
 *
 * `onSelect` lets SEO pages navigate to their localized URL instead of only
 * flipping the in-app language. `languages` limits the list to the ones a
 * page is offered in (an exam translated into Spanish only); when the chosen
 * language is not among them the page reads English, so English shows as current.
 * `current` overrides the shown language on a page whose language is fixed by
 * its URL (the English and Spanish CDL landings).
 * `hrefs` gives each language its own URL (translated exam landings): the
 * options become real links, rendered into the server HTML even while the
 * popover is closed so crawlers find every translated landing. A click still
 * runs `onSelect` (or sets the app language) on the way.
 */
export function LanguageSwitcher({
  onSelect,
  languages,
  current: currentOverride,
  hrefs,
  className = "",
}: {
  onSelect?: (lang: Language) => void;
  languages?: Language[];
  current?: Language;
  hrefs?: Partial<Record<Language, string>>;
  className?: string;
}) {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);

  const options = languages ? LANGUAGES.filter((l) => languages.includes(l.code)) : LANGUAGES;
  const current = options.find((l) => l.code === (currentOverride ?? language)) ?? options[0];

  const handleSelect = (lang: Language) => {
    setOpen(false);
    if (onSelect) {
      onSelect(lang);
      return;
    }
    setLanguage(lang);
  };

  const list = (
    <ul>
      {options.map((lang) => {
        const isActive = lang.code === current.code;
        const href = hrefs?.[lang.code];
        const optionClass = `flex w-full items-center gap-2.5 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isActive ? "font-semibold text-gray-900 dark:text-gray-50" : "text-gray-700 dark:text-gray-200"
        }`;
        const inner = (
          <>
            <span className="text-base leading-none" aria-hidden="true">
              {lang.flag}
            </span>
            <span className="flex-1">{lang.label}</span>
            {isActive && <Check className="h-4 w-4 text-brand-dark" aria-hidden="true" />}
          </>
        );
        return (
          <li key={lang.code}>
            {href ? (
              <Link
                href={href}
                hrefLang={lang.code}
                lang={lang.code}
                onClick={() => handleSelect(lang.code)}
                aria-current={isActive ? "page" : undefined}
                className={optionClass}
              >
                {inner}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleSelect(lang.code)}
                aria-current={isActive ? "true" : undefined}
                lang={lang.code}
                className={optionClass}
              >
                {inner}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Change language, current: ${current.label}${current.label === current.englishName ? "" : ` (${current.englishName})`}`}
        className={`flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1.5 text-sm text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${className}`}
      >
        <Globe className="hidden sm:block h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        <span className="text-base leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="hidden font-medium sm:inline">{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 dark:text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </PopoverTrigger>

      {hrefs ? (
        // No portal and always mounted (hidden while closed), so the links are
        // in the server-rendered HTML. Same look as PopoverContent.
        <PopoverPrimitive.Content
          forceMount
          align="end"
          sideOffset={4}
          className="z-50 w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=closed]:hidden"
        >
          {list}
        </PopoverPrimitive.Content>
      ) : (
        <PopoverContent align="end" className="w-44 p-1">
          {list}
        </PopoverContent>
      )}
    </Popover>
  );
}
