import { Question } from "@/types";
import nzroadQuestions from "@/data/nz-learner-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand learner licence bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nzroad: nzroadQuestions as Question[] });
