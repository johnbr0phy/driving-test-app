import { Question } from "@/types";
import phcleQuestions from "@/data/criminologist-licensure-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines Criminologist Licensure Examination bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ phcle: phcleQuestions as Question[] });
