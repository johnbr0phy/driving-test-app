"use client";

import { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Language, createT, type EnglishLocale } from "@/i18n";
import { useStore } from "@/store/useStore";
import { pageLanguage, testPageLanguage, pageEnglishLocale } from "@/lib/pageLanguage";
import { countryLanguage, languageIsChosen, readLanguageCookie, writeLanguageCookie } from "@/lib/language";
import { REGION_COOKIE, isRegion, type Region } from "@/lib/region";
import { urlLanguage } from "@/lib/urlLanguage";

interface LanguageContextType {
  /** The language this page shows its chrome in (lib/pageLanguage.ts). */
  language: Language;
  englishLocale: EnglishLocale;
  /** The person's own choice, stored and synced; pages may override it. */
  preferredLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  englishLocale: "en-US",
  preferredLanguage: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t, language, englishLocale, preferredLanguage, setLanguage } = useLanguage();
  return { t, language, englishLocale, preferredLanguage, setLanguage };
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
  // A test's own pages run in the test's language (lib/pageLanguage.ts).
  const testLanguages = useStore((state) => state.testLanguages);
  const dmvState = useStore((state) => state.selectedState);
  const language =
    testPageLanguage(pathname, preferredLanguage, testLanguages ?? {}, dmvState) ??
    pageLanguage(pathname, preferredLanguage, chosen);

  // Cookie-only visitors (including geo-selected UK) may not have an account
  // or a persisted store pick. Read after mount to preserve hydration parity.
  const [cookieRegion, setCookieRegion] = useState<Region | null>(null);
  useEffect(() => {
    const value = document.cookie.split("; ").find((part) => part.startsWith(`${REGION_COOKIE}=`))?.split("=")[1];
    setCookieRegion(isRegion(value) ? value : null);
  }, [pathname]);
  const englishLocale = pageEnglishLocale(pathname, region ?? cookieRegion ?? "US");
  const router = useRouter();
  const setLanguage = useCallback(
    (lang: Language) => {
      setStoreLanguage(lang);
      // Homepages are rendered on the server in the picked language
      // (middleware.ts reads the tt-lang cookie), so fetch the page again.
      router.refresh();
    },
    [setStoreLanguage, router]
  );

  // Update the html lang attribute when the page's language changes. A page
  // written in another language (/es/..., /de/...) keeps its URL's language:
  // its content is in it even when the header and footer follow the person's.
  useEffect(() => {
    const pageLang = urlLanguage(pathname) ?? language;
    document.documentElement.lang = pageLang === "en" ? englishLocale : pageLang;
  }, [language, pathname, englishLocale]);

  const t = useMemo(() => createT(language, englishLocale), [language, englishLocale]);

  const value = useMemo(
    () => ({ language, englishLocale, preferredLanguage, setLanguage, t }),
    [language, englishLocale, preferredLanguage, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
