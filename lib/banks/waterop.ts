import { Question } from "@/types";
import wateropQuestions from "@/data/water-treatment-operator-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The waterop bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ waterop: wateropQuestions as Question[] });
