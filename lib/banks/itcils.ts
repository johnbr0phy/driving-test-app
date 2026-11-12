import { Question } from "@/types";
import itcilsQuestions from "@/data/italy-cils-b1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// CILS B1 Cittadinanza, the Italian B1 language test for citizenship, in Italian. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ itcils: itcilsQuestions as Question[] });
