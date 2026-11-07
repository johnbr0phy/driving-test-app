// A new URL lets link crawlers fetch the redesigned card instead of a cached image.
export const SHARE_IMAGE_VERSION = "car-smile-3";
const NEW_MASCOT_IDS = new Set(["uklitu", "cacit", "aucit", "pmp"]);

const ROLE_MASCOT_IDS = new Set(["ffi", "police", "faapvt", "nasm", "barber", "jelec"]);

// Dedicated artwork replaces cached generic artwork for these exams only.
const AP_PH_MASCOT_IDS = new Set(["appsych", "apush", "apbio", "apworld", "aplang", "apcalcab", "aphug", "apgov", "phcse"]);

// Complete batch A sets replace borrowed artwork, ahead of the share-copy cache.
const BATCH_A_MASCOT_IDS = new Set(["cpafar", "cpareg", "nmls", "series63", "series65", "aswb", "arrt", "nce", "texesppr", "praxisplt"]);

// Batch B changes two role mascots and gives three accounting exams the CPA FAR family artwork.
const BATCH_B_MASCOT_IDS = new Set(["nhie", "nptepta", "cpaaud", "accafa", "aatl2"]);

// Batch C replaces the borrowed chef and project-management art for these two roles only.
const BATCH_C_MASCOT_IDS = new Set(["rdexam", "phr"]);

// Exams that got their own short share copy (Oct 31) instead of the long catalog blurb.
const SHARE_COPY_IDS = new Set(["iesafepass", "iespsv", "ieqfa", "iepsa", "nzmoto", "nzheavy", "nzsfe", "sgrtt", "sgm5", "sgvl", "jelec", "sie", "series7", "pcoc", "ffi", "police", "nasm", "rbt", "cpc", "cca", "cpafar", "cpareg", "nmls", "series63", "series65", "aswb", "arrt", "nce", "texesppr", "praxisplt", "iedtt", "cask", "cans", "ukseru", "nzroad", "netplus", "cysa", "gcdl", "phlto", "zak53", "sgbtt", "aerta", "ngfrsc", "kentsa", "mykpp", "hkdrive", "rrbgroupd", "sscgd", "sscchsl", "sscmts", "uppolice", "ibpsclerk", "jnvst", "jambeng", "appsych", "pkdrive", "sbipo", "sbiclerk", "ibpsrrb", "delhipolice", "biharpolice", "rajpolice", "mppolice", "apush", "apbio", "phcse", "upscse", "ssccpo", "rrbalp", "rpfconst", "nda", "agniveer", "agniveervayu", "apworld", "aplang", "phlet", "jeemain", "neet", "mhtcet", "cuet", "reet", "uptet", "ugcnet", "aissee", "aphug", "apcalcab", "jambmath", "jambbio", "jambchem", "jambphys", "apgov", "ngpolice", "cdcfib", "ngarmy", "ngcustoms", "trcnpqe", "esdgt", "ptimt", "ptmoto", "bedriving", "dkteori", "setrafik", "fitheory", "grdriving", "rodrpciv", "hukresz", "mttheory", "mtmoto", "cma", "nhie", "txadjuster", "sfadmin", "cfal1", "cpaaud", "accafa", "aatl2", "nbdhe", "nptepta", "aswbclin", "phr", "cisa", "cssgb", "ccs", "rdexam", "praxis5001", "fladjuster", "llqp", "cemap", "zak53c3", "sgftt", "sgres", "hkiiqe1", "hklesfi1", "nzfirearms", "nzlcq", "aesira", "mypce", "kenck", "iedttcv", "phnle", "phmedtech", "phpharm", "phmidwife", "phpsychom", "phnapolcom", "afpsat", "phcle", "phinsurance", "phrebroker", "ppsc", "punjabpolice", "pakarmy", "pkpaf", "pknle", "pkpnmc", "zak53moto", "zare5", "zasaps", "zapsira", "sehp", "dkmoto", "dkjagt", "fimoto", "fitruck", "fihygiene", "fihunt", "hukreszmoto", "hugki", "huelsoseg", "hubizt", "rocpi", "rotaxi", "roadmed", "rorezid"]);

const REMAINING_MASCOT_IDS = new Set(["capm", "psm", "itil", "cissp", "rbt", "cpc", "pcoc", "ukseru", "ibpspo", "ctet", "praxis", "gre", "gmat", "sie", "series7", "ssccgl", "rrbntpc"]);

// The homepage cards were redrawn like the search homepage, and /tests and /teach got their own (Nov 2026).
const HUB_IDS = new Set(["home", "tests", "teach", "uk", "ca", "au", "in", "ie", "nz", "ph", "my", "sg", "hk", "ae", "za", "ng", "pk", "ke", "es", "pt", "ro", "se", "gr", "dk", "hu", "be", "fi", "mt", "de"]);

export function shareImageUrl(id: string, language = "en"): string {
  const query = new URLSearchParams({
    v: BATCH_C_MASCOT_IDS.has(id) ? "batch-c-mascots-1" : BATCH_B_MASCOT_IDS.has(id) ? "batch-b-mascots-1" : BATCH_A_MASCOT_IDS.has(id) ? "batch-a-mascots-1" : AP_PH_MASCOT_IDS.has(id) ? "ap-ph-mascots-1" : HUB_IDS.has(id) ? "search-home-1" : SHARE_COPY_IDS.has(id) ? "share-copy-1" : REMAINING_MASCOT_IDS.has(id) ? "remaining-mascots-1" : ROLE_MASCOT_IDS.has(id) ? "role-mascots-1" : NEW_MASCOT_IDS.has(id) ? "citizenship-pmp-1" : SHARE_IMAGE_VERSION,
  });
  if (language !== "en") query.set("lang", language);
  return `/og/${encodeURIComponent(id)}?${query.toString()}`;
}
