import { Question } from "@/types";
import caplumbQuestions from "@/data/red-seal-plumber-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Plumber bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caplumb: caplumbQuestions as Question[] });
