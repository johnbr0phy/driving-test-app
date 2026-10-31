import { Question } from "@/types";
import zak53Questions from "@/data/south-africa-k53-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The South Africa K53 learner's licence bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ zak53: zak53Questions as Question[] });
