"use client";

import { useTranslation } from "@/contexts/LanguageContext";
import { LANGUAGES, type Language } from "@/i18n";

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
