import { Question } from "@/types";
import phmedtechQuestions from "@/data/philippines-medtech-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines Medical Technologist Licensure Examination (MTLE) bank. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ phmedtech: phmedtechQuestions as Question[] });
