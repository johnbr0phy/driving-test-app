import { Question } from "@/types";
import dkteoriQuestions from "@/data/denmark-driving-theory-questions.json";
import dkteoriQuestionsDa from "@/data/denmark-driving-theory-questions_da.json";
import { registerExamBanks } from "@/lib/examData";

// The Denmark driving theory (teoriprøve, category B) bank: English base, Danish (da-DK)
// translation. Imported for its side effect by this exam's app pages only, so no other exam's
// pages bundle it.
registerExamBanks({ dkteori: dkteoriQuestions as Question[] }, { dkteori: { da: dkteoriQuestionsDa as Question[] } });
