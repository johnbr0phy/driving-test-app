import { Question } from "@/types";
import rdexamQuestions from "@/data/rd-exam-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RD exam (CDR Registration Examination for Dietitians) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ rdexam: rdexamQuestions as Question[] });
