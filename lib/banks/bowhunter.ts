import { Question } from "@/types";
import bowhunterQuestions from "@/data/bowhunter-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The bowhunter education bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ bowhunter: bowhunterQuestions as Question[] });
