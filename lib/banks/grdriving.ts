import { Question } from "@/types";
import grdrivingQuestions from "@/data/greece-driving-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Greece driving theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ grdriving: grdrivingQuestions as Question[] });
