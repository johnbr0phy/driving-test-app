import { Question } from "@/types";
import deaevoQuestions from "@/data/de-aevo-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The German trainer aptitude exam bank (Ausbildereignungsprüfung, AEVO), written in German.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ deaevo: deaevoQuestions as Question[] });
