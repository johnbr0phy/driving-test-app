import { Question } from "@/types";
import dkteoriQuestions from "@/data/denmark-driving-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Denmark driving theory (teoriprøve, category B) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ dkteori: dkteoriQuestions as Question[] });
