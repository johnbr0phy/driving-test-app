import { Question } from "@/types";
import cpaiscQuestions from "@/data/cpa-isc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPA Exam ISC bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpaisc: cpaiscQuestions as Question[] });
