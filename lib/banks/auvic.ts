import { Question } from "@/types";
import auvicQuestions from "@/data/vic-learner-permit-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Victoria learner permit bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ auvic: auvicQuestions as Question[] });
