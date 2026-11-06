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
import { sv, countryNames as svNames } from "./sv";
import { da, countryNames as daNames } from "./da";
import { fi, countryNames as fiNames } from "./fi";
import { hu, countryNames as huNames } from "./hu";
import { ro, countryNames as roNames } from "./ro";
import { el, countryNames as elNames } from "./el";

export const TRANSLATED_COPY: Partial<Record<Language, HomeCopy>> = { es, pt, fr, it, nl, pl, vi, ko, zh, sv, da, fi, hu, ro, el };

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
  sv: svNames,
  da: daNames,
  fi: fiNames,
  hu: huNames,
  ro: roNames,
  el: elNames,
};

/** Countries as a sentence names them, where that differs from the bare name (French "le Royaume-Uni"). */
export const TRANSLATED_IN_NAMES: Partial<Record<Language, Record<string, string>>> = {
  es: esInNames,
  pt: ptInNames,
  fr: frInNames,
};
