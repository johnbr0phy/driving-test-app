import { Question } from "@/types";
import bcbaQuestions from "@/data/bcba-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The BCBA (BACB) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ bcba: bcbaQuestions as Question[] });
