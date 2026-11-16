import { Question } from "@/types";
import sgsnbQuestions from "@/data/singapore-snb-rn-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore Nursing Board RN Licensure Examination bank. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ sgsnb: sgsnbQuestions as Question[] });
