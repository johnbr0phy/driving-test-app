import { Question } from "@/types";
import fimotoQuestions from "@/data/finland-motorcycle-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Finland motorcycle theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ fimoto: fimotoQuestions as Question[] });
