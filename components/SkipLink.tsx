"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/i18n";

// "Skip to main content" in the page's language (machine-translated outside en and es).
const SKIP: Record<Language, string> = {
  en: "Skip to main content",
  es: "Saltar al contenido principal",
  vi: "Chuyển đến nội dung chính",
  ko: "본문으로 건너뛰기",
  zh: "跳到主要内容",
  de: "Zum Hauptinhalt springen",
  fr: "Aller au contenu principal",
  it: "Vai al contenuto principale",
  pl: "Przejdź do treści głównej",
  nl: "Naar de hoofdinhoud",
  pt: "Saltar para o conteúdo principal",
  sv: "Hoppa till huvudinnehållet",
  da: "Gå til hovedindholdet",
  fi: "Siirry pääsisältöön",
  hu: "Ugrás a fő tartalomra",
  ro: "Salt la conținutul principal",
  el: "Μετάβαση στο κύριο περιεχόμενο",
};

export function SkipLink() {
  const { language } = useLanguage();
  return (
    <a href="#main-content" className="skip-link">
      {SKIP[language] ?? SKIP.en}
    </a>
  );
}
