// The v2 interface string registry, without React, so a bank module can
// register its language's strings from a server page as well as a client one.
// See lib/v2/ui/index.ts.
import type { Language } from "@/i18n";
import { EN, type V2UiStrings } from "./en";

export type { V2UiStrings } from "./en";

export type DeepPartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

/** A translation: any subset of the English tree, same shape. */
export type V2UiTranslation = DeepPartial<V2UiStrings>;

const registered = new Map<Language, V2UiTranslation>();
const merged = new Map<Language, V2UiStrings>();

/** Register a language's strings. Called by lib/v2/ui/<lang>.ts at import. */
export function registerV2Ui(lang: Language, strings: V2UiTranslation): void {
  registered.set(lang, strings);
  merged.delete(lang);
}

function deepMerge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (typeof base !== "object" || base === null || Array.isArray(base) || typeof over !== "object") return over as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = deepMerge(out[k], v);
  return out as T;
}

/** The strings for `lang`, English wherever the language has no entry or is not registered yet. */
export function v2Ui(lang: Language | undefined | null): V2UiStrings {
  if (!lang || lang === "en") return EN;
  const over = registered.get(lang);
  if (!over) return EN;
  let m = merged.get(lang);
  if (!m) {
    m = deepMerge(EN, over);
    merged.set(lang, m);
  }
  return m;
}

/** True once `lang`'s strings are registered (English always is). */
export function hasV2Ui(lang: Language | undefined | null): boolean {
  return !lang || lang === "en" || registered.has(lang);
}

