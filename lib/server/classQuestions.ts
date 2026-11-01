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
import "@/lib/v2/banks/pmp";
import "@/lib/v2/banks/elevenplus";
import "@/lib/v2/banks/emt";
import "@/lib/v2/banks/eqao9";
import "@/lib/v2/banks/fsmaths";
import "@/lib/v2/banks/gcsecs";
import "@/lib/v2/banks/gcsehigher";
import "@/lib/v2/banks/gcsemaths";
import "@/lib/v2/banks/gcsescience";
import "@/lib/v2/banks/ged";
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
import "@/lib/v2/banks/faapvt";
import "@/lib/v2/banks/psat";
import "@/lib/v2/banks/praxis";
import "@/lib/v2/banks/gre";
import "@/lib/v2/banks/gmat";
import "@/lib/v2/banks/netplus";
import "@/lib/v2/banks/cissp";
import "@/lib/v2/banks/itil";
import "@/lib/v2/banks/psm";
import "@/lib/v2/banks/capm";
import "@/lib/v2/banks/gcdl";
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
import "@/lib/v2/banks/appsych";
import "@/lib/v2/banks/sbiclerk";
import "@/lib/v2/banks/sbipo";
import "@/lib/v2/banks/ibpsrrb";
import "@/lib/v2/banks/biharpolice";
import "@/lib/v2/banks/rajpolice";
import "@/lib/v2/banks/delhipolice";
import "@/lib/v2/banks/mppolice";
import "@/lib/v2/banks/apush";
import "@/lib/v2/banks/apbio";
import "@/lib/v2/banks/phcse";
import { DMV_EXAM_ID, classExamInfo } from "@/lib/classes";
import type { Question } from "@/types";
import type { QuestionV2 } from "@/lib/v2/types";

// Question text for the class page, from whichever bank a class's test uses:
// the DMV bank, a v1 registry bank or a v2 bank. Server only: it loads every
// bank once per server instance.

export interface ClassQuestionDisplay {
  question: string;
  options: string[];
  /** The correct answer as text ("" when the format has no single answer to show). */
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

function fromV2(q: QuestionV2): ClassQuestionDisplay {
  const choice = (q.format === "single" || q.format === "multi") && q.options && q.correct;
  return {
    question: q.stem,
    options: choice ? q.options! : [],
    answer: choice ? q.correct!.map((i) => q.options![i]).join("; ") : q.format === "numeric" ? String(q.numeric?.answers?.[0] ?? "") : "",
    category: q.domain,
    explanation: q.explanation ?? "",
  };
}

export function classQuestionLookup(examId: string): (questionId: string) => ClassQuestionDisplay | undefined {
  try {
    const kind = classExamInfo(examId)?.kind;
    if (examId === DMV_EXAM_ID) {
      const byId = new Map(getQuestionsData("en").map((q) => [q.questionId, q]));
      return (id) => (byId.has(id) ? fromV1(byId.get(id)!) : undefined);
    }
    if (kind === "v2") {
      const index = getQuestionIndex(examId);
      return (id) => (index.has(id) ? fromV2(index.get(id)!) : undefined);
    }
    const byId = new Map(getExamQuestions(examId as Parameters<typeof getExamQuestions>[0]).map((q) => [q.questionId, q]));
    return (id) => (byId.has(id) ? fromV1(byId.get(id)!) : undefined);
  } catch {
    return () => undefined;
  }
}
