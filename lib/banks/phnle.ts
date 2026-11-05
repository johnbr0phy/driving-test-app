import { Question } from "@/types";
import phnleQuestions from "@/data/philippines-nle-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippine Nurse Licensure Examination (PNLE) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ phnle: phnleQuestions as Question[] });
