import { Question } from "@/types";
import caabQuestions from "@/data/alberta-class-7-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Alberta Class 7 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caab: caabQuestions as Question[] });
