import { Question } from "@/types";
import nlwftQuestions from "@/data/nl-wft-basis-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Wft Basis bank (Dutch financial services competence exam, module Basis), written in
// Dutch. Imported for its side effect by this exam's app pages only, so no other exam's pages
// bundle it.
registerExamBanks({ nlwft: nlwftQuestions as Question[] });
