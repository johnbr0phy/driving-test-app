import { Question } from "@/types";
import r410aQuestions from "@/data/r410a-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The r410a bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ r410a: r410aQuestions as Question[] });
