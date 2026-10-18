import { Question } from "@/types";
import ccmaQuestions from "@/data/ccma-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ccma bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ccma: ccmaQuestions as Question[] });
