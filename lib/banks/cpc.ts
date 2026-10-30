import { Question } from "@/types";
import cpcQuestions from "@/data/cpc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPC (AAPC Certified Professional Coder) bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ cpc: cpcQuestions as Question[] });
