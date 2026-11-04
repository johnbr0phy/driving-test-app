import { Question } from "@/types";
import aswbclinQuestions from "@/data/aswb-clinical-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASWB Clinical bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aswbclin: aswbclinQuestions as Question[] });
