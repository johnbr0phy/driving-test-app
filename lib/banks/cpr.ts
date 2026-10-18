import { Question } from "@/types";
import cprQuestions from "@/data/cpr-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The cpr bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpr: cprQuestions as Question[] });
