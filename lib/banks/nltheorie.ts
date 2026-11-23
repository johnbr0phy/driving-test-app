import { Question } from "@/types";
import nltheorieQuestions from "@/data/netherlands-driving-theory-questions.json";
import nltheorieQuestionsNl from "@/data/netherlands-driving-theory-questions_nl.json";
import { registerExamBanks } from "@/lib/examData";

// The Netherlands driving theory bank: English base, Dutch (nl-NL) translation. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nltheorie: nltheorieQuestions as Question[] }, { nltheorie: { nl: nltheorieQuestionsNl as Question[] } });
