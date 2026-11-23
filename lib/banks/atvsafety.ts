import { Question } from "@/types";
import atvsafetyQuestions from "@/data/atv-snowmobile-safety-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ATV and snowmobile safety course bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ atvsafety: atvsafetyQuestions as Question[] });
