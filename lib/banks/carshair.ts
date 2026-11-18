import { Question } from "@/types";
import carshairQuestions from "@/data/red-seal-hairstylist-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Hairstylist bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ carshair: carshairQuestions as Question[] });
