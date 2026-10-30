import { Question } from "@/types";
import auqldQuestions from "@/data/qld-learner-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The QLD learner licence bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ auqld: auqldQuestions as Question[] });
