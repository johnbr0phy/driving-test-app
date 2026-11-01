// The homepage copy in the languages other than English and German
// (components/home/homeCopy.ts): machine-translated, pending native review.
// Each file also names every country in its language (COUNTRY_NAMES).

import type { Language } from "@/i18n";
import type { HomeCopy } from "../homeCopy";
import { es, countryNames as esNames, inNames as esInNames } from "./es";
import { pt, countryNames as ptNames, inNames as ptInNames } from "./pt";
import { fr, countryNames as frNames, inNames as frInNames } from "./fr";
import { it, countryNames as itNames } from "./it";
import { nl, countryNames as nlNames } from "./nl";
import { pl, countryNames as plNames } from "./pl";
import { vi, countryNames as viNames } from "./vi";
import { ko, countryNames as koNames } from "./ko";
import { zh, countryNames as zhNames } from "./zh";

export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh };

export const TRANSLATED_COUNTRY_NAMES: Partial<Record<Language, Record<string, string>>> = {
  es: esNames,
  pt: ptNames,
  fr: frNames,
  it: itNames,
  nl: nlNames,
  pl: plNames,
  vi: viNames,
  ko: koNames,
  zh: zhNames,
};

/** Countries as a sentence names them, where that differs from the bare name (French "le Royaume-Uni"). */
export const TRANSLATED_IN_NAMES: Partial<Record<Language, Record<string, string>>> = {
  es: esInNames,
  pt: ptInNames,
  fr: frInNames,
};
