import { Question } from "@/types";
import fladjusterQuestions from "@/data/florida-adjuster-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Florida 6-20 all-lines adjuster bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ fladjuster: fladjusterQuestions as Question[] });
