import { Question } from "@/types";
import fpcQuestions from "@/data/fpc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The FPC (Fundamental Payroll Certification) bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ fpc: fpcQuestions as Question[] });
