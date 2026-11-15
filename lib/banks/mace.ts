import { Question } from "@/types";
import maceQuestions from "@/data/medication-aide-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Medication Aide (MACE) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ mace: maceQuestions as Question[] });
