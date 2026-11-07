import { Question } from "@/types";
import demotorradQuestions from "@/data/de-motorrad-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The German motorcycle theory test bank (Führerschein Klasse A, A1, A2), written in German.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ demotorrad: demotorradQuestions as Question[] });
