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
import { v2Ui, type V2UiStrings } from "./registry";

export { v2Ui, hasV2Ui, registerV2Ui, type V2UiStrings, type V2UiTranslation } from "./registry";

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
