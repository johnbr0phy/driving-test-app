import { Question } from "@/types";
import esguardiaQuestions from "@/data/es-guardia-civil-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Guardia Civil entrance exam bank (Escala de Cabos y Guardias), written in Spanish. Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ esguardia: esguardiaQuestions as Question[] });
