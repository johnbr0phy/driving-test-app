import { Question } from "@/types";
import aswbQuestions from "@/data/aswb-masters-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASWB Masters bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aswb: aswbQuestions as Question[] });
