import { Question } from "@/types";
import palsQuestions from "@/data/pals-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PALS bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ pals: palsQuestions as Question[] });
