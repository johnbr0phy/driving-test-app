import { Question } from "@/types";
import mtmotoQuestions from "@/data/malta-motorcycle-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malta motorcycle theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ mtmoto: mtmotoQuestions as Question[] });
