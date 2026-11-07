import { Question } from "@/types";
import bevrachtQuestions from "@/data/be-vrachtwagen-c-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Belgian truck licence C/CE theory and driver CPC (vakbekwaamheid) bank, written in Dutch.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ bevracht: bevrachtQuestions as Question[] });
