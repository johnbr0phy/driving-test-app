"use client";

import { createContext, useContext, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Language, createT } from "@/i18n";
import { useStore } from "@/store/useStore";
import { pageLanguage } from "@/lib/pageLanguage";

interface LanguageContextType {
  /** The language this page shows its chrome in (lib/pageLanguage.ts). */
  language: Language;
  /** The person's own choice, stored and synced; pages may override it. */
  preferredLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  preferredLanguage: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t, language, preferredLanguage, setLanguage } = useLanguage();
  return { t, language, preferredLanguage, setLanguage };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const preferredLanguage = useStore((state) => state.language);
  const setStoreLanguage = useStore((state) => state.setLanguage);
  const pathname = usePathname();
  // A native-language exam runs in its own language, the DMV only in the
  // languages it has questions for, a country homepage in its country's.
  const language = pageLanguage(pathname, preferredLanguage);

  const setLanguage = useCallback(
    (lang: Language) => {
      setStoreLanguage(lang);
    },
    [setStoreLanguage]
  );

  // Update the html lang attribute when the page's language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => createT(language), [language]);

  const value = useMemo(
    () => ({ language, preferredLanguage, setLanguage, t }),
    [language, preferredLanguage, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
