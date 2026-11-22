import { Question } from "@/types";
import plbronQuestions from "@/data/pl-bron-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Polish firearms permit exam bank (egzamin na pozwolenie na broń, theory part), written in
// Polish. Imported for its side effect by this exam's app pages only, so no other exam's pages
// bundle it.
registerExamBanks({ plbron: plbronQuestions as Question[] });
