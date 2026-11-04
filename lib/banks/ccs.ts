import { Question } from "@/types";
import ccsQuestions from "@/data/ccs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCS bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ccs: ccsQuestions as Question[] });
