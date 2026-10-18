import { Question } from "@/types";
import civicsQuestions from "@/data/civics-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The civics bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ civics: civicsQuestions as Question[] });
