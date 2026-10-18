import { Question } from "@/types";
import foodmgrQuestions from "@/data/food-manager-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The foodmgr bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ foodmgr: foodmgrQuestions as Question[] });
