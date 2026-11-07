import { Question } from "@/types";
import fitruckQuestions from "@/data/finland-truck-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Finland truck and bus theory test bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ fitruck: fitruckQuestions as Question[] });
