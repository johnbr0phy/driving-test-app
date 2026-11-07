import { Question } from "@/types";
import esvigilanteQuestions from "@/data/es-vigilante-seguridad-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Spanish private security guard (vigilante de seguridad) exam bank, written in Spanish. Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ esvigilante: esvigilanteQuestions as Question[] });
