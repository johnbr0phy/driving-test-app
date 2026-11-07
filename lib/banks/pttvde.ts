import { Question } from "@/types";
import pttvdeQuestions from "@/data/pt-tvde-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal TVDE ride-hailing driver exam bank (Exame TVDE), written in Portuguese. Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ pttvde: pttvdeQuestions as Question[] });
