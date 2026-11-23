import { Question } from "@/types";
import ukdroneQuestions from "@/data/uk-drone-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UK Flyer ID and A2 CofC theory bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ ukdrone: ukdroneQuestions as Question[] });
