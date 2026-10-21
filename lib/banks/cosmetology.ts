import { Question } from "@/types";
import cosmetologyQuestions from "@/data/cosmetology-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The cosmetology bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cosmetology: cosmetologyQuestions as Question[] });
