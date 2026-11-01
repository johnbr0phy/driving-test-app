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
import { PMP } from "./exams/pmp";
import { ASVAB } from "./exams/asvab";
import { ACCUPLACER } from "./exams/accuplacer";
import { ACT } from "./exams/act";
import { GED } from "./exams/ged";
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
import { HSCMATHS } from "./exams/hscmaths";
import { FAAPVT } from "./exams/faapvt";
import { PSAT } from "./exams/psat";
import { PRAXIS } from "./exams/praxis";
import { GRE } from "./exams/gre";
import { GMAT } from "./exams/gmat";
import { NETPLUS } from "./exams/netplus";
import { CISSP } from "./exams/cissp";
import { ITIL } from "./exams/itil";
import { PSM } from "./exams/psm";
import { CAPM } from "./exams/capm";
import { GCDL } from "./exams/gcdl";
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
import { APPSYCH } from "./exams/appsych";

export const EXAMS_V2: ExamV2Config[] = [GED, PRAXIS, SAT, PSAT, ACT, APPSYCH, GRE, GMAT, TEAS, HESI, ASVAB, ACCUPLACER, NCLEX, NCLEXPN, REXPN, UKNMC, EMT, PARAMEDIC, FAAPVT, SECPLUS, CISSP, NETPLUS, APLUS, AWS, AWSSAA, AZ900, GCDL, CCNA, PMP, CAPM, PSM, ITIL, SSCCGL, SSCCHSL, SSCGD, SSCMTS, RRBNTPC, RRBGROUPD, UPPOLICE, IBPSPO, IBPSCLERK, CTET, JNVST, JAMBENG, TIMESTABLES, KS2, ELEVENPLUS, GCSEMATHS, GCSEHIGHER, GCSESCIENCE, GCSECS, FSMATHS, OSSLT, EQAO9, NAPLAN7, NAPLAN, OCNSW, NSWSEL, VICSEL, HSCMATHS];

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
