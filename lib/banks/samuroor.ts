import { Question } from "@/types";
import samuroorQuestions from "@/data/saudi-muroor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Saudi Arabia (Muroor) driving theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ samuroor: samuroorQuestions as Question[] });
