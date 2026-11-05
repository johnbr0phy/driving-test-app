import { Question } from "@/types";
import zak53motoQuestions from "@/data/south-africa-k53-code-1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The South Africa K53 Code 1 (motorcycle) learner's licence bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ zak53moto: zak53motoQuestions as Question[] });
