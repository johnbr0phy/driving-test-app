import { Question } from "@/types";
import arrtQuestions from "@/data/arrt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ARRT Radiography bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ arrt: arrtQuestions as Question[] });
