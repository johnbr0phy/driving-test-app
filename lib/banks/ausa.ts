import { Question } from "@/types";
import ausaQuestions from "@/data/sa-learners-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SA learner's test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ausa: ausaQuestions as Question[] });
