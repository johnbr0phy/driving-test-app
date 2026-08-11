"use client";

import { useState } from "react";
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
 * flipping the in-app language.
 */
export function LanguageSwitcher({
  onSelect,
  className = "",
}: {
  onSelect?: (lang: Language) => void;
  className?: string;
}) {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const handleSelect = (lang: Language) => {
    setOpen(false);
    if (onSelect) {
      onSelect(lang);
      return;
    }
    setLanguage(lang);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Change language — current language ${current.englishName}`}
        className={`flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${className}`}
      >
        <Globe className="h-4 w-4 text-gray-500" aria-hidden="true" />
        <span className="text-base leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="hidden font-medium sm:inline">{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-44 p-1">
        <ul>
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === language;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  aria-current={isActive ? "true" : undefined}
                  lang={lang.code}
                  className={`flex w-full items-center gap-2.5 rounded-sm px-2 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                    isActive ? "font-semibold text-gray-900" : "text-gray-700"
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span className="flex-1">{lang.label}</span>
                  {isActive && <Check className="h-4 w-4 text-brand" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
