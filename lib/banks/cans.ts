import { Question } from "@/types";
import cansQuestions from "@/data/nova-scotia-learners-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nova Scotia Class 7 learner's knowledge test bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cans: cansQuestions as Question[] });
