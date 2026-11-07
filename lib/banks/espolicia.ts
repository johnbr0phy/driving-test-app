import { Question } from "@/types";
import espoliciaQuestions from "@/data/policia-nacional-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Policía Nacional entrance exam bank (Escala Básica knowledge test), written in Spanish.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ espolicia: espoliciaQuestions as Question[] });
