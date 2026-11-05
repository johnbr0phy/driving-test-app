import { Question } from "@/types";
import nzmotoQuestions from "@/data/nz-motorcycle-learner-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand motorcycle (class 6) learner licence bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzmoto: nzmotoQuestions as Question[] });
