import { Question } from "@/types";
import trapperQuestions from "@/data/trapper-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The trapper education bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ trapper: trapperQuestions as Question[] });
