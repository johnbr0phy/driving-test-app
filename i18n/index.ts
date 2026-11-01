import { en, TranslationKeys } from './en';
import { es } from './es';
import { vi } from './vi';
import { ko } from './ko';
import { zh } from './zh';
import { de } from './de';
import { fr } from './fr';
import { it } from './it';
import { pl } from './pl';
import { nl } from './nl';
import { pt } from './pt';

export type Language = 'en' | 'es' | 'vi' | 'ko' | 'zh' | 'de' | 'fr' | 'it' | 'pl' | 'nl' | 'pt';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko, zh, de, fr, it, pl, nl, pt };

/** Every supported language, in the order the switcher lists them. */
export const LANGUAGES: { code: Language; flag: string; label: string; englishName: string }[] = [
  { code: 'en', flag: '\u{1F1FA}\u{1F1F8}', label: 'English', englishName: 'English' },
  { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'Español', englishName: 'Spanish' },
  { code: 'vi', flag: '\u{1F1FB}\u{1F1F3}', label: 'Tiếng Việt', englishName: 'Vietnamese' },
  { code: 'ko', flag: '\u{1F1F0}\u{1F1F7}', label: '한국어', englishName: 'Korean' },
  { code: 'zh', flag: '\u{1F1E8}\u{1F1F3}', label: '简体中文', englishName: 'Chinese (Simplified)' },
  { code: 'de', flag: '\u{1F1E9}\u{1F1EA}', label: 'Deutsch', englishName: 'German' },
  { code: 'fr', flag: '\u{1F1EB}\u{1F1F7}', label: 'Français', englishName: 'French' },
  { code: 'it', flag: '\u{1F1EE}\u{1F1F9}', label: 'Italiano', englishName: 'Italian' },
  { code: 'pl', flag: '\u{1F1F5}\u{1F1F1}', label: 'Polski', englishName: 'Polish' },
  { code: 'nl', flag: '\u{1F1F3}\u{1F1F1}', label: 'Nederlands', englishName: 'Dutch' },
  { code: 'pt', flag: '\u{1F1F5}\u{1F1F9}', label: 'Português', englishName: 'Portuguese' },
];

/**
 * The languages the DMV flow runs in (a question bank and SEO pages for each).
 * DMV pages show only these; a person whose chosen language is another one
 * reads the DMV in English (contexts/LanguageContext.tsx).
 */
export const DMV_LANGUAGES: Language[] = ['en', 'es', 'vi', 'ko', 'zh'];

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(translations, value);
}

/** The value at a dot-separated key path ("common.logOut"), or undefined. */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  let current: unknown = obj;
  for (const key of path.split('.')) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Create a translation function for a given language. A key the language's
 * dictionary lacks (the newer dictionaries carry no DMV category names) reads
 * English, and a key no dictionary has reads as its key path.
 */
export function createT(language: Language) {
  const dict = translations[language] as unknown as Record<string, unknown>;
  const fallback = en as unknown as Record<string, unknown>;
  return function t(key: string): string {
    return getNestedValue(dict, key) ?? (language === 'en' ? undefined : getNestedValue(fallback, key)) ?? key;
  };
}

export { en, es, vi, ko, zh, de, fr, it, pl, nl, pt };
export type { TranslationKeys };
