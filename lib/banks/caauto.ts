import { Question } from "@/types";
import caautoQuestions from "@/data/red-seal-automotive-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Automotive Service Technician bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caauto: caautoQuestions as Question[] });
