import { Question } from "@/types";
import grmotoQuestions from "@/data/greece-motorcycle-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Greece motorcycle theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ grmoto: grmotoQuestions as Question[] });
