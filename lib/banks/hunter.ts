import { Question } from "@/types";
import hunterQuestions from "@/data/hunter-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The hunter bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hunter: hunterQuestions as Question[] });
