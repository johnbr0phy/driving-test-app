import { Question } from "@/types";
import caairbrakeQuestions from "@/data/ontario-air-brake-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ontario air brake (Z) endorsement bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ caairbrake: caairbrakeQuestions as Question[] });
