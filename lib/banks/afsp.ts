import { Question } from "@/types";
import afspQuestions from "@/data/annual-federal-tax-refresher-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The IRS Annual Filing Season Program AFTR course test bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ afsp: afspQuestions as Question[] });
