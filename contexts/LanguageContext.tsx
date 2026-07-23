"use client";

import { createContext, useContext, useEffect, useMemo, useCallback } from "react";
import { Language, createT } from "@/i18n";
import { useStore } from "@/store/useStore";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
}

const SUPPORTED_LANGUAGES: Language[] = ["en", "es", "vi"];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useStore((state) => state.language);
  const setStoreLanguage = useStore((state) => state.setLanguage);

  // Allow sharing links that open in a specific language, e.g. /?lang=vi.
  // The choice persists via the store, so navigation keeps the language.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param && (SUPPORTED_LANGUAGES as string[]).includes(param)) {
      setStoreLanguage(param as Language);
    }
  }, [setStoreLanguage]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setStoreLanguage(lang);
    },
    [setStoreLanguage]
  );

  // Update the html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => createT(language), [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
