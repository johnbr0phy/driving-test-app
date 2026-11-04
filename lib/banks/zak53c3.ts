import { Question } from "@/types";
import zak53c3Questions from "@/data/south-africa-k53-code-3-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The South Africa K53 Code 3 (heavy vehicle) learner's licence bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ zak53c3: zak53c3Questions as Question[] });
