import { Question } from "@/types";
import detheorieQuestions from "@/data/de-theorie-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The German car theory test bank (Führerschein Klasse B), written in German. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ detheorie: detheorieQuestions as Question[] });
