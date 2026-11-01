"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { LANGUAGES, type Language } from "@/i18n";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * "Questions in: English | Español" on a test's dashboard: the languages this
 * test really exists in (hooks/useTestLanguage.ts). Nothing when there is
 * only one. Tests already in progress keep the questions they started with.
 */
export function TestLanguageChoice({
  offered,
  value,
  onChange,
  className = "",
}: {
  offered: Language[];
  value: Language;
  onChange: (lang: Language) => void;
  className?: string;
}) {
  const { t } = useTranslation();
  if (offered.length < 2) return null;
  const options = LANGUAGES.filter((l) => offered.includes(l.code));
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 text-sm ${className}`}>
      <span className="text-gray-600 dark:text-gray-300">{t("languageChoice.questionsIn")}</span>
      <div role="radiogroup" aria-label={t("languageChoice.questionsIn")} className="inline-flex flex-wrap gap-1 rounded-full bg-gray-100 dark:bg-gray-800 p-1">
        {options.map((l) => {
          const active = l.code === value;
          return (
            <button
              key={l.code}
              type="button"
              role="radio"
              aria-checked={active}
              lang={l.code}
              onClick={() => onChange(l.code)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                active
                  ? "bg-white dark:bg-gray-900 font-semibold text-gray-900 dark:text-gray-50 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              <span aria-hidden="true">{l.flag}</span>
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** The chosen language as a flag and name, e.g. "🇪🇸 Español". */
export function LanguageLabel({ lang }: { lang: Language }) {
  const l = LANGUAGES.find((x) => x.code === lang);
  if (!l) return null;
  return (
    <span lang={l.code}>
      <span aria-hidden="true">{l.flag}</span> {l.label}
    </span>
  );
}

/**
 * A test's settings once they are made: one line in the dashboard hero
 * ("Maryland · 🇪🇸 Español", or just the language) with a Change control that
 * opens a small box holding the choices (`children`). Until the language is
 * settled (picked, or the test already started) the hero shows the full
 * choice instead, so a newcomer sees it.
 */
export function TestSettingsLine({ summary, children }: { summary: React.ReactNode; children: React.ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 text-xs">
      <span className="font-semibold text-gray-800 dark:text-gray-100 min-w-0 truncate">{summary}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex flex-shrink-0 items-center gap-1 py-1 -my-1 font-medium text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
          {t("common.change")}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto max-w-[calc(100vw-2rem)] space-y-3 p-3">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
}
