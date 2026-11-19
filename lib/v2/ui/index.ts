"use client";

// The v2 engine's interface strings (buttons, timers, dashboard, results,
// stats, drills) in every site language. English is the base and always
// bundled; another language is registered by importing its module
// (lib/v2/ui/<lang>.ts), which an exam's bank module does for its own
// language, so a page only ships the strings it needs. A missing key falls
// back to English. The chrome runs in the exam's own language
// (ExamV2Config.language, English when unset), like a v1 test's pages.
//
// Usage: wrap a v2 page in <V2UiProvider language={exam.language}> (V2Shell
// does it for the exam's routes) and read strings with useV2Ui() in any
// component under it. Outside a provider useV2Ui() returns English.

import { createContext, createElement, useContext } from "react";
import type { Language } from "@/i18n";
import { EN, type V2UiStrings } from "./en";

export type { V2UiStrings } from "./en";

type DeepPartial<T> = T extends (...args: never[]) => unknown
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

const LangContext = createContext<Language>("en");

export function V2UiProvider({ language, children }: { language?: Language; children: React.ReactNode }) {
  return createElement(LangContext.Provider, { value: language ?? "en" }, children);
}

/** The page's v2 language (the exam's own, English by default). */
export function useV2Language(): Language {
  return useContext(LangContext);
}

/** The v2 interface strings for the page's language. Resolved on every render,
 *  so strings registered after first paint (a bank loaded on demand) apply. */
export function useV2Ui(): V2UiStrings {
  return v2Ui(useContext(LangContext));
}
