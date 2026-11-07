import { Question } from "@/types";
import ptvigilQuestions from "@/data/pt-vigilante-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal private security guard (vigilante, PSP/CNESP) exam bank, written in Portuguese.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ptvigil: ptvigilQuestions as Question[] });
