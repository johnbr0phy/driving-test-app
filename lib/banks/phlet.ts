import { Question } from "@/types";
import phletQuestions from "@/data/philippines-let-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines LET (LEPT) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ phlet: phletQuestions as Question[] });
