import { Question } from "@/types";
import mttheoryQuestions from "@/data/malta-driving-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malta driving theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ mttheory: mttheoryQuestions as Question[] });
