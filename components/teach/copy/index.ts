// The teacher pages' copy in the languages other than English
// (components/teach/teachCopy.ts): machine-translated, final.

import type { Language } from "@/i18n";
import type { TeachCopy } from "../teachCopy";
import { es } from "./es";
import { vi } from "./vi";
import { ko } from "./ko";
import { zh } from "./zh";
import { de } from "./de";
import { fr } from "./fr";
import { it } from "./it";
import { pl } from "./pl";
import { nl } from "./nl";
import { pt } from "./pt";
import { sv } from "./sv";
import { da } from "./da";
import { fi } from "./fi";
import { hu } from "./hu";
import { ro } from "./ro";
import { el } from "./el";

export const TRANSLATED_TEACH_COPY: Record<Exclude<Language, "en">, TeachCopy> = { es, vi, ko, zh, de, fr, it, pl, nl, pt, sv, da, fi, hu, ro, el };
