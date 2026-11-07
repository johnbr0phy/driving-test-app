import { Question } from "@/types";
import roadmedQuestions from "@/data/romania-medicine-admission-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Romanian medicine admission exam bank (Biologie și Chimie), written in Romanian. Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ roadmed: roadmedQuestions as Question[] });
