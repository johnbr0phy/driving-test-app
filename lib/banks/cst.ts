import { Question } from "@/types";
import cstQuestions from "@/data/cst-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The cst bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cst: cstQuestions as Question[] });
