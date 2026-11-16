import { Question } from "@/types";
import cpctaQuestions from "@/data/cpcta-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NHA CPCT/A bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpcta: cpctaQuestions as Question[] });
