import { Question } from "@/types";
import zasapsQuestions from "@/data/saps-recruitment-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SAPS police trainee recruitment bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ zasaps: zasapsQuestions as Question[] });
