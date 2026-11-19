// English v2 interface strings, the base every other language falls back to.
// Each group lives in lib/v2/ui/en/<group>.ts. Plain strings, or functions
// for text with numbers or names in it (translations give their own
// function, so word order and plurals can differ).
import { common } from "./en/common";
import { runner } from "./en/runner";
import { dashboard } from "./en/dashboard";
import { results } from "./en/results";
import { drill } from "./en/drill";

export const EN = { common, runner, dashboard, results, drill };

/** The shape every language follows (a translation may leave keys out). */
export type V2UiStrings = typeof EN;
