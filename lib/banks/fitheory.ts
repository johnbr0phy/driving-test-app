import { Question } from "@/types";
import fitheoryQuestions from "@/data/finland-driving-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Finland driving theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ fitheory: fitheoryQuestions as Question[] });
