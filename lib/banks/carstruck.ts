import { Question } from "@/types";
import carstruckQuestions from "@/data/red-seal-truck-transport-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Truck and Transport Mechanic bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ carstruck: carstruckQuestions as Question[] });
