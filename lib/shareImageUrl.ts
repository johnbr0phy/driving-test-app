// A new URL lets link crawlers fetch the redesigned card instead of a cached image.
export const SHARE_IMAGE_VERSION = "car-smile-3";
const NEW_MASCOT_IDS = new Set(["uklitu", "cacit", "aucit", "pmp"]);

const ROLE_MASCOT_IDS = new Set(["ffi", "police", "faapvt", "nasm", "barber", "jelec"]);

// Exams that got their own short share copy (Oct 31) instead of the long catalog blurb.
const SHARE_COPY_IDS = new Set(["jelec", "sie", "series7", "pcoc", "ffi", "police", "nasm", "rbt", "cpc", "iedtt", "cask", "cans", "ukseru", "nzroad", "netplus", "gcdl", "phlto", "zak53", "sgbtt", "aerta", "ngfrsc", "kentsa", "mykpp", "hkdrive", "rrbgroupd", "sscgd", "sscchsl", "sscmts", "uppolice", "ibpsclerk", "jnvst", "jambeng", "appsych", "pkdrive", "sbipo", "sbiclerk", "ibpsrrb", "delhipolice", "biharpolice", "rajpolice", "mppolice", "apush", "apbio", "phcse", "upscse", "ssccpo", "rrbalp", "rpfconst", "nda", "agniveer", "agniveervayu", "apworld", "aplang", "phlet", "jeemain", "neet", "mhtcet", "cuet", "reet", "uptet", "ugcnet", "aissee", "aphug", "apcalcab", "jambmath", "jambbio", "jambchem", "jambphys", "apgov", "ngpolice", "cdcfib", "ngarmy", "ngcustoms", "trcnpqe", "esdgt", "ptimt", "bedriving", "dkteori", "setrafik", "fitheory", "grdriving", "rodrpciv", "hukresz", "mttheory"]);

const REMAINING_MASCOT_IDS = new Set(["capm", "psm", "itil", "cissp", "rbt", "cpc", "pcoc", "ukseru", "ibpspo", "ctet", "praxis", "gre", "gmat", "sie", "series7", "ssccgl", "rrbntpc"]);

// The homepage cards were redrawn like the search homepage, and /tests and /teach got their own (Nov 2026).
const HUB_IDS = new Set(["home", "tests", "teach", "uk", "ca", "au", "in", "ie", "nz", "ph", "my", "sg", "hk", "ae", "za", "ng", "pk", "ke", "es", "pt", "ro", "se", "gr", "dk", "hu", "be", "fi", "mt", "de"]);

export function shareImageUrl(id: string, language = "en"): string {
  const query = new URLSearchParams({
    v: HUB_IDS.has(id) ? "search-home-1" : SHARE_COPY_IDS.has(id) ? "share-copy-1" : REMAINING_MASCOT_IDS.has(id) ? "remaining-mascots-1" : ROLE_MASCOT_IDS.has(id) ? "role-mascots-1" : NEW_MASCOT_IDS.has(id) ? "citizenship-pmp-1" : SHARE_IMAGE_VERSION,
  });
  if (language !== "en") query.set("lang", language);
  return `/og/${encodeURIComponent(id)}?${query.toString()}`;
}
