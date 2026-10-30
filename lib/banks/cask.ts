import { Question } from "@/types";
import caskQuestions from "@/data/saskatchewan-learners-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Saskatchewan Class 7 learner bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cask: caskQuestions as Question[] });
