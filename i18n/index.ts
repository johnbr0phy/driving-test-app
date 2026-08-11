import { en, TranslationKeys } from './en';
import { es } from './es';
import { vi } from './vi';
import { ko } from './ko';

export type Language = 'en' | 'es' | 'vi' | 'ko';

const translations: Record<Language, TranslationKeys> = { en, es, vi, ko };

/** Every supported language, in the order the switcher lists them. */
export const LANGUAGES: { code: Language; flag: string; label: string; englishName: string }[] = [
  { code: 'en', flag: '\u{1F1FA}\u{1F1F8}', label: 'English', englishName: 'English' },
  { code: 'es', flag: '\u{1F1EA}\u{1F1F8}', label: 'Español', englishName: 'Spanish' },
  { code: 'vi', flag: '\u{1F1FB}\u{1F1F3}', label: 'Tiếng Việt', englishName: 'Vietnamese' },
  { code: 'ko', flag: '\u{1F1F0}\u{1F1F7}', label: '한국어', englishName: 'Korean' },
];

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && value in translations;
}

/**
 * Get a nested value from a translation object using a dot-separated key path.
 * e.g., getNestedValue(en, "common.logOut") => "Log Out"
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path; // Fallback to the key path
    }
    current = (current as Record<string, unknown>)[key];
  }

  if (typeof current === 'string') return current;
  return path; // Fallback
}

/**
 * Create a translation function for a given language.
 */
export function createT(language: Language) {
  const dict = translations[language];
  return function t(key: string): string {
    return getNestedValue(dict as unknown as Record<string, unknown>, key);
  };
}

export { en, es, vi, ko };
export type { TranslationKeys };
