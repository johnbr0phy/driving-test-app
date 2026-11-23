"use client";

import { useTranslation } from "@/contexts/LanguageContext";
import { pickTeachCopy, teachEn, type TeachCopy } from "@/components/teach/teachCopy";
import { TRANSLATED_TEACH_COPY } from "@/components/teach/copy";

/**
 * The teacher pages' copy in the person's interface language. `english` forces
 * English, for pieces shared with the quiz report (still English-only).
 */
export function useTeachCopy(english = false): TeachCopy {
  const { language, englishLocale } = useTranslation();
  if (english) return teachEn;
  return pickTeachCopy(language, englishLocale, TRANSLATED_TEACH_COPY);
}
