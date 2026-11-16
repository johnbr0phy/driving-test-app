import { Question } from "@/types";
import panceQuestions from "@/data/pance-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PANCE bank. Imported for its side effect by this exam's app pages only, so no
// other exam's pages bundle it.
registerExamBanks({ pance: panceQuestions as Question[] });
