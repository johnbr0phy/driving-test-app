import { Question } from "@/types";
import bedrivingQuestions from "@/data/belgium-driving-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Belgium driving theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ bedriving: bedrivingQuestions as Question[] });
