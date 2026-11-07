import { Question } from "@/types";
import hukreszmotoQuestions from "@/data/hungary-motorcycle-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hungary motorcycle theory exam bank (AM, A1, A2, A). Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ hukreszmoto: hukreszmotoQuestions as Question[] });
