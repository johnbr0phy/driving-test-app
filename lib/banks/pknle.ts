import { Question } from "@/types";
import pknleQuestions from "@/data/pmdc-nle-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PMDC National Registration Examination (formerly NLE) bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ pknle: pknleQuestions as Question[] });
