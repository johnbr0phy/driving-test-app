import { Question } from "@/types";
import cadroneadvQuestions from "@/data/canada-drone-advanced-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Transport Canada Advanced Exam (drone pilot, advanced operations) bank. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cadroneadv: cadroneadvQuestions as Question[] });
