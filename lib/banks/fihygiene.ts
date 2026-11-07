import { Question } from "@/types";
import fihygieneQuestions from "@/data/finland-hygiene-passport-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Finland Hygiene Passport test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ fihygiene: fihygieneQuestions as Question[] });
