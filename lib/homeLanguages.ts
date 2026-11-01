// Kept tiny on purpose: middleware.ts imports it, so it must not pull in the
// translation dictionaries.

/** The cookie that mirrors the person's picked language (lib/language.ts). */
export const LANG_COOKIE = "tt-lang";

/** The languages a homepage is written in (components/home/homeCopy.ts). */
export const HOME_LANGUAGES = ["en", "de", "es", "pt", "fr", "it", "nl", "pl", "vi", "ko", "zh"] as const;
export type HomeLanguage = (typeof HOME_LANGUAGES)[number];

export function isHomeLanguage(v: unknown): v is HomeLanguage {
  return typeof v === "string" && (HOME_LANGUAGES as readonly string[]).includes(v);
}
