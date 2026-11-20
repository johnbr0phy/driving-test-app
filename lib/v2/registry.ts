import { ExamV2Config } from "./types";
import { SAT } from "./exams/sat";
import { TEAS } from "./exams/teas";
import { HESI } from "./exams/hesi";
import { NCLEX } from "./exams/nclex";
import { NCLEXPN } from "./exams/nclexpn";
import { EMT } from "./exams/emt";
import { PARAMEDIC } from "./exams/paramedic";
import { SECPLUS } from "./exams/secplus";
import { APLUS } from "./exams/aplus";
import { AWS } from "./exams/aws";
import { AWSSAA } from "./exams/awssaa";
import { AZ900 } from "./exams/az900";
import { CCNA } from "./exams/ccna";
import { UKNMC } from "./exams/uknmc";
import { NZIQN } from "./exams/nziqn";
import { NZENSF } from "./exams/nzensf";
import { PMP } from "./exams/pmp";
import { PMIACP } from "./exams/pmiacp";
import { ASVAB } from "./exams/asvab";
import { ACCUPLACER } from "./exams/accuplacer";
import { ACT } from "./exams/act";
import { GED } from "./exams/ged";
import { HISET } from "./exams/hiset";
import { CBEST } from "./exams/cbest";
import { TABE } from "./exams/tabe";
import { TIMESTABLES } from "./exams/timestables";
import { KS2 } from "./exams/ks2";
import { GCSEMATHS } from "./exams/gcsemaths";
import { OSSLT } from "./exams/osslt";
import { NAPLAN } from "./exams/naplan";
import { NSWSEL } from "./exams/nswsel";
import { GCSEHIGHER } from "./exams/gcsehigher";
import { GCSESCIENCE } from "./exams/gcsescience";
import { GCSECS } from "./exams/gcsecs";
import { ELEVENPLUS } from "./exams/elevenplus";
import { FSMATHS } from "./exams/fsmaths";
import { REXPN } from "./exams/rexpn";
import { EQAO9 } from "./exams/eqao9";
import { NAPLAN7 } from "./exams/naplan7";
import { OCNSW } from "./exams/ocnsw";
import { VICSEL } from "./exams/vicsel";
import { MAPGROWTH } from "./exams/mapgrowth";
import { ISEE } from "./exams/isee";
import { SSAT } from "./exams/ssat";
import { COGAT } from "./exams/cogat";
import { HSPT } from "./exams/hspt";
import { SHSAT } from "./exams/shsat";
import { STAARALG1 } from "./exams/staaralg1";
import { STAARENG1 } from "./exams/staareng1";
import { STAARBIO } from "./exams/staarbio";
import { HSCMATHS } from "./exams/hscmaths";
import { FAAPVT } from "./exams/faapvt";
import { PSAT } from "./exams/psat";
import { PRAXIS } from "./exams/praxis";
import { GRE } from "./exams/gre";
import { GMAT } from "./exams/gmat";
import { IELTSREAD } from "./exams/ieltsread";
import { TOEFLREAD } from "./exams/toeflread";
import { MCAT } from "./exams/mcat";
import { NAPLEX } from "./exams/naplex";
import { DAT } from "./exams/dat";
import { LSAT } from "./exams/lsat";
import { IIMCAT } from "./exams/iimcat";
import { AFOQT } from "./exams/afoqt";
import { SEHP } from "./exams/sehp";
import { NETPLUS } from "./exams/netplus";
import { LINUXPLUS } from "./exams/linuxplus";
import { SFPD1 } from "./exams/sfpd1";
import { SFAPPBUILDER } from "./exams/sfappbuilder";
import { CYSA } from "./exams/cysa";
import { FORTINSE } from "./exams/fortinse";
import { SSCP } from "./exams/sscp";
import { SERVICENOWCSA } from "./exams/servicenowcsa";
import { SECURITYX } from "./exams/securityx";
import { PENTESTPLUS } from "./exams/pentestplus";
import { CEH } from "./exams/ceh";
import { SC200 } from "./exams/sc200";
import { SC900 } from "./exams/sc900";
import { AI901 } from "./exams/ai901";
import { PL900 } from "./exams/pl900";
import { JNCIA } from "./exams/jncia";
import { CCNPENCOR } from "./exams/ccnpencor";
import { ISC2CC } from "./exams/isc2cc";
import { CISSP } from "./exams/cissp";
import { ITIL } from "./exams/itil";
import { ISTQB } from "./exams/istqb";
import { COBIT } from "./exams/cobit";
import { PRINCE2 } from "./exams/prince2";
import { PSM } from "./exams/psm";
import { PSPO } from "./exams/pspo";
import { CAPM } from "./exams/capm";
import { GCDL } from "./exams/gcdl";
import { GCPPCA } from "./exams/gcppca";
import { SSCCGL } from "./exams/ssccgl";
import { RRBNTPC } from "./exams/rrbntpc";
import { CTET } from "./exams/ctet";
import { IBPSPO } from "./exams/ibpspo";
import { RRBGROUPD } from "./exams/rrbgroupd";
import { SSCGD } from "./exams/sscgd";
import { SSCCHSL } from "./exams/sscchsl";
import { SSCMTS } from "./exams/sscmts";
import { UPPOLICE } from "./exams/uppolice";
import { IBPSCLERK } from "./exams/ibpsclerk";
import { JNVST } from "./exams/jnvst";
import { JAMBENG } from "./exams/jambeng";
import { JAMBMATH } from "./exams/jambmath";
import { WASSCEMATH } from "./exams/wasscemath";
import { JAMBBIO } from "./exams/jambbio";
import { JAMBCHEM } from "./exams/jambchem";
import { OSSSC } from "./exams/osssc";
import { VIDYAGYAN } from "./exams/vidyagyan";
import { APCSP } from "./exams/apcsp";
import { JAMBLIT } from "./exams/jamblit";
import { JAMBPHYS } from "./exams/jambphys";
import { WASSCEENG } from "./exams/wassceeng";
import { APPSYCH } from "./exams/appsych";
import { SBICLERK } from "./exams/sbiclerk";
import { SBIPO } from "./exams/sbipo";
import { IBPSRRB } from "./exams/ibpsrrb";
import { BIHARPOLICE } from "./exams/biharpolice";
import { RAJPOLICE } from "./exams/rajpolice";
import { DELHIPOLICE } from "./exams/delhipolice";
import { MPPOLICE } from "./exams/mppolice";
import { JKSSBJA } from "./exams/jkssbja";
import { TGSI } from "./exams/tgsi";
import { APUSH } from "./exams/apush";
import { APITALIAN } from "./exams/apitalian";
import { APGOV } from "./exams/apgov";
import { APBIO } from "./exams/apbio";
import { PHCSE } from "./exams/phcse";
import { UPSCSE } from "./exams/upscse";
import { NDA } from "./exams/nda";
import { AGNIVEER } from "./exams/agniveer";
import { AGNIVEERVAYU } from "./exams/agniveervayu";
import { RRBALP } from "./exams/rrbalp";
import { RPFCONST } from "./exams/rpfconst";
import { SSCCPO } from "./exams/ssccpo";
import { APWORLD } from "./exams/apworld";
import { APLANG } from "./exams/aplang";
import { NEET } from "./exams/neet";
import { JEEMAIN } from "./exams/jeemain";
import { MHTCET } from "./exams/mhtcet";
import { KCET } from "./exams/kcet";
import { ITA2 } from "./exams/ita2";
import { ITCILSB2 } from "./exams/itcilsb2";
import { ITCILS } from "./exams/itcils";
import { ITCELI } from "./exams/itceli";
import { CUET } from "./exams/cuet";
import { UGCNET } from "./exams/ugcnet";
import { REET } from "./exams/reet";
import { UPTET } from "./exams/uptet";
import { AISSEE } from "./exams/aissee";
import { APCALCAB } from "./exams/apcalcab";
import { APHUG } from "./exams/aphug";
import { WONDERLIC } from "./exams/wonderlic";
import { lockedStepCount } from "../examLocks";

export const EXAMS_V2: ExamV2Config[] = [GED, HISET, TABE, PRAXIS, CBEST, SAT, PSAT, ACT, MAPGROWTH, STAARBIO, STAARENG1, STAARALG1, SHSAT, HSPT, COGAT, SSAT, ISEE, APPSYCH, APUSH, APGOV, APWORLD, APHUG, APLANG, APBIO, APCALCAB, APITALIAN, APCSP, GRE, GMAT, LSAT, MCAT, DAT, IELTSREAD, TOEFLREAD, WONDERLIC, SEHP, ITCILS, ITCELI, ITA2, ITCILSB2, TEAS, HESI, ASVAB, AFOQT, ACCUPLACER, NCLEX, NCLEXPN, REXPN, NAPLEX, UKNMC, NZENSF, NZIQN, EMT, PARAMEDIC, FAAPVT, SECPLUS, CYSA, PENTESTPLUS, FORTINSE, CISSP, NETPLUS, LINUXPLUS, SFPD1, SFAPPBUILDER, APLUS, AWS, AWSSAA, AZ900, SC900, AI901, PL900, SC200, GCDL, GCPPCA, CCNA, CCNPENCOR, JNCIA, PMP, PMIACP, CAPM, PSM, PSPO, ITIL, ISTQB, COBIT, PRINCE2, UPSCSE, SSCCGL, SSCCHSL, SSCCPO, SSCGD, SSCMTS, RRBNTPC, RRBGROUPD, RRBALP, RPFCONST, UPPOLICE, DELHIPOLICE, BIHARPOLICE, RAJPOLICE, MPPOLICE, TGSI, IBPSPO, SBIPO, IBPSCLERK, SBICLERK, IBPSRRB, NDA, AGNIVEER, AGNIVEERVAYU, JEEMAIN, NEET, MHTCET, KCET, CUET, IIMCAT, CTET, REET, UPTET, UGCNET, JNVST, AISSEE, OSSSC, VIDYAGYAN, JAMBENG, JAMBMATH, WASSCEMATH, JAMBBIO, JAMBCHEM, JAMBPHYS, JAMBLIT, WASSCEENG, PHCSE, TIMESTABLES, KS2, ELEVENPLUS, GCSEMATHS, GCSEHIGHER, GCSESCIENCE, GCSECS, FSMATHS, OSSLT, EQAO9, NAPLAN7, NAPLAN, OCNSW, NSWSEL, VICSEL, HSCMATHS, JKSSBJA, CEH, ISC2CC, SECURITYX, SERVICENOWCSA, SSCP];

/**
 * The light Premium tier on v2 exams (Nov 2026), the v1 rule carried over:
 * the last quarter of the drills and practice tests (lockedStepCount) needs
 * the one-time purchase, everything before it is free. Only career, licensing, government-job and
 * graduate-admission exams are listed. School, college-entrance and
  "servicenowcsa",
  "sscp",
  "securityx",
 * children's tests (SAT, ACT, AP, GED, GCSE, KS2, 11+, NAPLAN, JAMB, JEE,
 * NEET and the rest) are never sold: leave a new one off this list.
 */
export const PREMIUM_V2_IDS: string[] = [
  "osssc",
  "praxis", "cbest", "gre", "gmat", "lsat", "mcat", "dat", "ieltsread", "toeflread", "teas", "hesi", "asvab", "afoqt",
  "nclex", "nclexpn", "rexpn", "uknmc", "naplex", "nzensf", "nziqn", "emt", "paramedic", "faapvt",
  "secplus", "cysa", "pentestplus", "fortinse", "cissp", "netplus", "linuxplus", "sfpd1", "sfappbuilder", "aplus", "aws", "awssaa", "az900", "ai901", "pl900", "sc900", "sc200", "gcdl", "gcppca", "ccna", "ccnpencor", "jncia",
  "pmp", "capm", "psm", "itil", "istqb", "cobit", "prince2", "wonderlic",
  "secplus", "cysa", "pentestplus", "fortinse", "cissp", "netplus", "linuxplus", "sfpd1", "sfappbuilder", "aplus", "aws", "awssaa", "az900", "ai901", "pl900", "sc900", "sc200", "gcdl", "gcppca", "ccna", "jncia",
  "pmp", "capm", "psm", "pspo", "itil", "istqb", "cobit", "prince2", "wonderlic",
  "secplus", "cysa", "pentestplus", "fortinse", "cissp", "netplus", "linuxplus", "sfpd1", "sfappbuilder", "aplus", "aws", "awssaa", "az900", "ai901", "pl900", "sc900", "sc200", "gcdl", "gcppca", "ccna", "jncia",
  "pmp", "pmiacp", "capm", "psm", "itil", "istqb", "cobit", "prince2", "wonderlic",
  "secplus", "cysa", "pentestplus", "ceh", "fortinse", "cissp", "netplus", "aplus", "aws", "awssaa", "az900", "sc900", "sc200", "gcdl", "gcppca", "ccna",
  "secplus", "cysa", "pentestplus", "fortinse", "isc2cc", "cissp", "netplus", "aplus", "aws", "awssaa", "az900", "sc900", "sc200", "gcdl", "gcppca", "ccna",
  "pmp", "capm", "psm", "itil", "wonderlic",
  "upscse", "ssccgl", "sscchsl", "ssccpo", "sscgd", "sscmts", "rrbntpc", "rrbgroupd", "rrbalp", "rpfconst",
  "uppolice", "delhipolice", "biharpolice", "rajpolice", "mppolice", "jkssbja", "tgsi", "iimcat",
  "ibpspo", "sbipo", "ibpsclerk", "sbiclerk", "ibpsrrb", "agniveer", "agniveervayu",
  "ctet", "reet", "uptet", "ugcnet", "phcse",
  "itcils", "itceli", "ita2", "itcilsb2",
];

for (const exam of EXAMS_V2) {
  if (exam.premium || !PREMIUM_V2_IDS.includes(exam.id)) continue;
  // A quarter of the dashboard's drills and tests, from the end: the last
  // test when there is more than one, the rest from the last drills.
  const count = lockedStepCount(exam.drills.length + exam.tests.length);
  const lastTest = exam.tests.length > 1 ? exam.tests[exam.tests.length - 1] : undefined;
  const drillCount = Math.min(Math.max(0, exam.drills.length - 1), Math.max(lastTest ? 0 : 1, count - (lastTest ? 1 : 0)));
  const lastDrills = drillCount > 0 ? exam.drills.slice(-drillCount) : [];
  exam.premium = {
    lockedTests: lastTest ? [lastTest.number] : [],
    lockedDrills: lastDrills.map((d) => d.key),
    benefits: [
      ...(lastTest ? [`${exam.shortName} ${lastTest.name}${lastTest.heldOut ? ", the one that never appears in the drills" : ""}`] : []),
      ...lastDrills.map((d) => `The ${d.name} drill`),
      "The final sets and tests of every other exam on Tigertest",
      "One payment, no subscription",
    ],
  };
}

export function getExamV2(id: string): ExamV2Config {
  const exam = EXAMS_V2.find((e) => e.id === id);
  if (!exam) throw new Error(`Unknown v2 exam: ${id}`);
  return exam;
}

/** The v2 exam a path belongs to: its app routes or its landing page. */
export function getExamV2ByPath(pathname: string | null | undefined): ExamV2Config | undefined {
  if (!pathname) return undefined;
  return EXAMS_V2.find((e) => pathname === e.slug || pathname === e.landingPath || pathname.startsWith(`${e.slug}/`));
}

export function getSectionV2(exam: ExamV2Config, key: string) {
  const section = exam.sections.find((s) => s.key === key);
  if (!section) throw new Error(`Unknown section ${key} for ${exam.id}`);
  return section;
}

/** Flattened (section, module) stages in test order. */
export function stagesOf(exam: ExamV2Config) {
  return exam.sections.flatMap((section) => section.modules.map((module) => ({ section, module })));
}

/** A drill's number in URLs: its 1-based place in the config. */
function drillNumber(exam: ExamV2Config, key: string): number {
  return exam.drills.findIndex((d) => d.key === key) + 1;
}

/** The drill a /practice/[n] value names: its number, or (old links) its key or legacyKey. */
export function drillFromParam(exam: ExamV2Config, raw: string | null | undefined) {
  if (!raw) return undefined;
  if (/^\d+$/.test(raw)) return exam.drills[parseInt(raw, 10) - 1];
  return exam.drills.find((d) => d.key === raw) ?? exam.drills.find((d) => d.legacyKey === raw);
}

/** Same shape as every exam: /<exam>/dashboard, /<exam>/practice/<n>, /<exam>/test/<n>. */
export const v2Routes = (exam: ExamV2Config) => ({
  dashboard: `${exam.slug}/dashboard`,
  test: (n: number) => `${exam.slug}/test/${n}`,
  results: (n: number) => `${exam.slug}/test/${n}/results`,
  stats: `${exam.slug}/stats`,
  /** A drill's front door: the Basics overview when it has one, else the questions. */
  drill: (key: string) => `${exam.slug}/practice/${drillNumber(exam, key)}`,
  /** Straight to the exam-level questions (DrillRunner). */
  drillQuestions: (key: string) => `${exam.slug}/practice/${drillNumber(exam, key)}?level=exam`,
  basics: (key: string, skillId: string) => `${exam.slug}/practice/${drillNumber(exam, key)}?skill=${skillId}`,
});
