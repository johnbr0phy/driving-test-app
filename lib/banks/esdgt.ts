import { Question } from "@/types";
import esdgtQuestions from "@/data/spain-dgt-questions.json";
import esdgtQuestionsEs from "@/data/spain-dgt-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The Spain DGT theory exam bank (permiso B): English base, Spanish (es-ES) translation.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ esdgt: esdgtQuestions as Question[] }, { esdgt: { es: esdgtQuestionsEs as Question[] } });
