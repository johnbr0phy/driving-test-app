import { Question } from "@/types";
import grolQuestions from "@/data/grol-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The FCC GROL (Elements 1 and 3) bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ grol: grolQuestions as Question[] });
