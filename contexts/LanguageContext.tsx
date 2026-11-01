"use client";

import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { Language, createT } from "@/i18n";
import { useStore } from "@/store/useStore";
import { pageLanguage } from "@/lib/pageLanguage";
import { countryLanguage, languageIsChosen, readLanguageCookie, writeLanguageCookie } from "@/lib/language";

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
  const storeLanguage = useStore((state) => state.language);
  const chosen = useStore((state) => languageIsChosen(state));
  const region = useStore((state) => state.region);
  const setStoreLanguage = useStore((state) => state.setLanguage);
  const pathname = usePathname();
  // Until the person picks a language their country's applies. It comes from
  // a cookie, so it is read after mount to keep the server HTML and the first
  // client render the same.
  const [countryLang, setCountryLang] = useState<Language>("en");
  useEffect(() => setCountryLang(countryLanguage(region)), [region]);
  const preferredLanguage = chosen ? storeLanguage : countryLang;
  // Keep middleware's copy of the pick in step (a pick from another device,
  // or one saved before the cookie existed).
  useEffect(() => {
    if (chosen && readLanguageCookie() !== storeLanguage) writeLanguageCookie(storeLanguage);
  }, [chosen, storeLanguage]);
  // Landing pages keep the language of their URL; a country homepage shows in
  // its own language until the person picks one (lib/pageLanguage.ts).
  const language = pageLanguage(pathname, preferredLanguage, chosen);

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
