import { Question } from "@/types";
import caabguardQuestions from "@/data/alberta-security-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Alberta Basic Security Training (ABST) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ caabguard: caabguardQuestions as Question[] });
