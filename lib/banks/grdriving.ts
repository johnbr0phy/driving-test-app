import { Question } from "@/types";
import grdrivingQuestions from "@/data/greece-driving-questions.json";
import grdrivingQuestionsEl from "@/data/greece-driving-questions_el.json";
import { registerExamBanks } from "@/lib/examData";

// The Greece driving theory test bank: English base, Greek (el-GR) translation.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ grdriving: grdrivingQuestions as Question[] }, { grdriving: { el: grdrivingQuestionsEl as Question[] } });
