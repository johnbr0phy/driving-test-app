import { getExamQuestions } from "@/lib/examData";
import { getQuestionsData } from "@/lib/testGenerator";
import { getQuestionIndex } from "@/lib/v2/bank";
import "@/lib/banks/all";
import "@/lib/v2/banks/accuplacer";
import "@/lib/v2/banks/act";
import "@/lib/v2/banks/aplus";
import "@/lib/v2/banks/asvab";
import "@/lib/v2/banks/aws";
import "@/lib/v2/banks/awssaa";
import "@/lib/v2/banks/az900";
import "@/lib/v2/banks/ccna";
import "@/lib/v2/banks/uknmc";
import "@/lib/v2/banks/nziqn";
import "@/lib/v2/banks/nzensf";
import "@/lib/v2/banks/pmp";
import "@/lib/v2/banks/pmiacp";
import "@/lib/v2/banks/elevenplus";
import "@/lib/v2/banks/emt";
import "@/lib/v2/banks/eqao9";
import "@/lib/v2/banks/fsmaths";
import "@/lib/v2/banks/gcsecs";
import "@/lib/v2/banks/gcsehigher";
import "@/lib/v2/banks/gcsemaths";
import "@/lib/v2/banks/gcsescience";
import "@/lib/v2/banks/ged";
import "@/lib/v2/banks/cbest";
import "@/lib/v2/banks/hiset";
import "@/lib/v2/banks/shsat";
import "@/lib/v2/banks/tabe";
import "@/lib/v2/banks/hesi";
import "@/lib/v2/banks/hscmaths";
import "@/lib/v2/banks/ks2";
import "@/lib/v2/banks/naplan";
import "@/lib/v2/banks/naplan7";
import "@/lib/v2/banks/nclex";
import "@/lib/v2/banks/nclexpn";
import "@/lib/v2/banks/rexpn";
import "@/lib/v2/banks/nswsel";
import "@/lib/v2/banks/ocnsw";
import "@/lib/v2/banks/osslt";
import "@/lib/v2/banks/paramedic";
import "@/lib/v2/banks/sat";
import "@/lib/v2/banks/secplus";
import "@/lib/v2/banks/teas";
import "@/lib/v2/banks/timestables";
import "@/lib/v2/banks/vicsel";
import "@/lib/v2/banks/mapgrowth";
import "@/lib/v2/banks/isee";
import "@/lib/v2/banks/ssat";
import "@/lib/v2/banks/cogat";
import "@/lib/v2/banks/hspt";
import "@/lib/v2/banks/staaralg1";
import "@/lib/v2/banks/staareng1";
import "@/lib/v2/banks/staarbio";
import "@/lib/v2/banks/faapvt";
import "@/lib/v2/banks/psat";
import "@/lib/v2/banks/praxis";
import "@/lib/v2/banks/gre";
import "@/lib/v2/banks/gmat";
import "@/lib/v2/banks/mcat";
import "@/lib/v2/banks/naplex";
import "@/lib/v2/banks/dat";
import "@/lib/v2/banks/lsat";
import "@/lib/v2/banks/afoqt";
import "@/lib/v2/banks/wonderlic";
import "@/lib/v2/banks/ccat";
import "@/lib/v2/banks/iimcat";
import "@/lib/v2/banks/sehp";
import "@/lib/v2/banks/netplus";
import "@/lib/v2/banks/linuxplus";
import "@/lib/v2/banks/sfpd1";
import "@/lib/v2/banks/sfappbuilder";
import "@/lib/v2/banks/cysa";
import "@/lib/v2/banks/fortinse";
import "@/lib/v2/banks/pentestplus";
import "@/lib/v2/banks/securityx";
import "@/lib/v2/banks/servicenowcsa";
import "@/lib/v2/banks/sscp";
import "@/lib/v2/banks/ceh";
import "@/lib/v2/banks/sc200";
import "@/lib/v2/banks/isc2cc";
import "@/lib/v2/banks/sc900";
import "@/lib/v2/banks/ai901";
import "@/lib/v2/banks/awsaif";
import "@/lib/v2/banks/pl900";
import "@/lib/v2/banks/jncia";
import "@/lib/v2/banks/ccnpencor";
import "@/lib/v2/banks/cissp";
import "@/lib/v2/banks/itil";
import "@/lib/v2/banks/istqb";
import "@/lib/v2/banks/cobit";
import "@/lib/v2/banks/prince2";
import "@/lib/v2/banks/psm";
import "@/lib/v2/banks/pspo";
import "@/lib/v2/banks/capm";
import "@/lib/v2/banks/gcdl";
import "@/lib/v2/banks/gcppca";
import "@/lib/v2/banks/ssccgl";
import "@/lib/v2/banks/rrbntpc";
import "@/lib/v2/banks/ctet";
import "@/lib/v2/banks/ibpspo";
import "@/lib/v2/banks/rrbgroupd";
import "@/lib/v2/banks/sscgd";
import "@/lib/v2/banks/sscchsl";
import "@/lib/v2/banks/sscmts";
import "@/lib/v2/banks/uppolice";
import "@/lib/v2/banks/ibpsclerk";
import "@/lib/v2/banks/jnvst";
import "@/lib/v2/banks/jambeng";
import "@/lib/v2/banks/jambmath";
import "@/lib/v2/banks/wasscemath";
import "@/lib/v2/banks/jambbio";
import "@/lib/v2/banks/jambchem";
import "@/lib/v2/banks/jambphys";
import "@/lib/v2/banks/jamblit";
import "@/lib/v2/banks/apcsp";
import "@/lib/v2/banks/osssc";
import "@/lib/v2/banks/vidyagyan";
import "@/lib/v2/banks/wassceeng";
import "@/lib/v2/banks/appsych";
import "@/lib/v2/banks/sbiclerk";
import "@/lib/v2/banks/sbipo";
import "@/lib/v2/banks/ibpsrrb";
import "@/lib/v2/banks/biharpolice";
import "@/lib/v2/banks/rajpolice";
import "@/lib/v2/banks/delhipolice";
import "@/lib/v2/banks/mppolice";
import "@/lib/v2/banks/jkssbja";
import "@/lib/v2/banks/tgsi";
import "@/lib/v2/banks/apush";
import "@/lib/v2/banks/apitalian";
import "@/lib/v2/banks/ieltsread";
import "@/lib/v2/banks/toeflread";
import "@/lib/v2/banks/apgov";
import "@/lib/v2/banks/apbio";
import "@/lib/v2/banks/phcse";
import "@/lib/v2/banks/upscse";
import "@/lib/v2/banks/nda";
import "@/lib/v2/banks/agniveer";
import "@/lib/v2/banks/agniveervayu";
import "@/lib/v2/banks/rrbalp";
import "@/lib/v2/banks/inrrn";
import "@/lib/v2/banks/rpfconst";
import "@/lib/v2/banks/ssccpo";
import "@/lib/v2/banks/apworld";
import "@/lib/v2/banks/aplang";
import "@/lib/v2/banks/neet";
import "@/lib/v2/banks/jeemain";
import "@/lib/v2/banks/mhtcet";
import "@/lib/v2/banks/kcet";
import "@/lib/v2/banks/ita2";
import "@/lib/v2/banks/itcilsb2";
import "@/lib/v2/banks/itcils";
import "@/lib/v2/banks/itceli";
import "@/lib/v2/banks/cuet";
import "@/lib/v2/banks/ugcnet";
import "@/lib/v2/banks/reet";
import "@/lib/v2/banks/uptet";
import "@/lib/v2/banks/aissee";
import "@/lib/v2/banks/apcalcab";
import "@/lib/v2/banks/aphug";
import { DMV_EXAM_ID, classExamInfo } from "@/lib/classes";
import { DMV_LANGUAGES, type Language } from "@/i18n";
import type { Question } from "@/types";
import type { QuestionV2 } from "@/lib/v2/types";

// Question text for the class page, from whichever bank a class's test uses:
// the DMV bank, a v1 registry bank or a v2 bank. Server only: it loads every
// bank once per server instance.

export interface ClassQuestionDisplay {
  question: string;
  options: string[];
  /** The correct answer as text, for every format ("" only when the item has no key). */
  answer: string;
  category: string;
  explanation: string;
}

function fromV1(q: Question): ClassQuestionDisplay {
  return {
    question: q.question,
    options: [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean),
    answer: q[`option${q.correctAnswer}` as "optionA"] ?? "",
    category: q.category,
    explanation: q.explanation ?? "",
  };
}

/** Every v2 format's answer as one line of text (report replies, the class page). */
export function v2AnswerText(q: QuestionV2): string {
  const key = q.correct ?? [];
  const pick = (list: string[] | undefined, i: number) => list?.[i] ?? "";
  switch (q.format) {
    case "single":
    case "multi":
      return key.map((i) => pick(q.options, i)).filter(Boolean).join("; ");
    case "numeric":
      return String(q.numeric?.answers?.[0] ?? "");
    case "order":
      return key.map((i) => pick(q.options, i)).filter(Boolean).join(" → ");
    case "matrix":
      return (q.rows ?? []).map((row, r) => `${row}: ${pick(q.columns, key[r])}`).join(" · ");
    case "cloze":
      return (q.blanks ?? []).map((b, i) => pick(b, key[i])).filter(Boolean).join(" · ");
    case "bowtie": {
      const flat = (q.groups ?? []).flatMap((g) => g.options);
      return key.map((i) => flat[i] ?? "").filter(Boolean).join("; ");
    }
    case "highlight": {
      const marks = [...(q.passage || q.stem).matchAll(/\{\{([^{}]+)\}\}/g)].map((m) => m[1]);
      return key.map((i) => marks[i] ?? "").filter(Boolean).join("; ");
    }
    default:
      return "";
  }
}

/** The stem as plain reading text: highlight markers unwrapped, cloze blanks as ___. */
function plainStem(stem: string): string {
  return stem.replace(/\{\{([^{}]+)\}\}/g, "$1").replace(/\[\[\d+\]\]/g, "___");
}

function fromV2(q: QuestionV2): ClassQuestionDisplay {
  const choice = (q.format === "single" || q.format === "multi") && q.options && q.correct;
  return {
    question: plainStem(q.stem),
    options: choice ? q.options! : [],
    answer: v2AnswerText(q),
    category: q.domain,
    explanation: q.explanation ?? "",
  };
}

/** `language` picks a translated bank where the test has one (report replies); otherwise the test's own. */
export function classQuestionLookup(examId: string, language?: Language): (questionId: string) => ClassQuestionDisplay | undefined {
  try {
    const kind = classExamInfo(examId)?.kind;
    if (examId === DMV_EXAM_ID) {
      const byId = new Map(getQuestionsData(language && DMV_LANGUAGES.includes(language) ? language : "en").map((q) => [q.questionId, q]));
      return (id) => (byId.has(id) ? fromV1(byId.get(id)!) : undefined);
    }
    if (kind === "v2") {
      const index = getQuestionIndex(examId);
      return (id) => (index.has(id) ? fromV2(index.get(id)!) : undefined);
    }
    const byId = new Map(getExamQuestions(examId as Parameters<typeof getExamQuestions>[0], language).map((q) => [q.questionId, q]));
    return (id) => (byId.has(id) ? fromV1(byId.get(id)!) : undefined);
  } catch {
    return () => undefined;
  }
}
