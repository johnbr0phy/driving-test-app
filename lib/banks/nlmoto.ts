import { Question } from "@/types";
import nlmotoQuestions from "@/data/nl-motor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Netherlands motorcycle theory exam bank (CBR, rijbewijs A1, A2, A), written in Dutch.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nlmoto: nlmotoQuestions as Question[] });
