import { Question } from "@/types";
import pesticideQuestions from "@/data/pesticide-applicator-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The pesticide applicator core bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ pesticide: pesticideQuestions as Question[] });
