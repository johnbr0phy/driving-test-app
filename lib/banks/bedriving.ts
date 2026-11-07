import { Question } from "@/types";
import bedrivingQuestions from "@/data/belgium-driving-questions.json";
import bedrivingQuestionsNl from "@/data/belgium-driving-questions_nl.json";
import bedrivingQuestionsFr from "@/data/belgium-driving-questions_fr.json";
import { registerExamBanks } from "@/lib/examData";

// The Belgium driving theory bank: English base, Belgian Dutch (nl-BE) and Belgian French (fr-BE) translations.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks(
  { bedriving: bedrivingQuestions as Question[] },
  { bedriving: { nl: bedrivingQuestionsNl as Question[], fr: bedrivingQuestionsFr as Question[] } },
);
