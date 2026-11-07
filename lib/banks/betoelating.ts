import { Question } from "@/types";
import betoelatingQuestions from "@/data/be-toelatingsexamen-arts-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Flemish medical and dental admission exam bank (toelatingsexamen arts en tandarts), written
// in Dutch. Imported for its side effect by this exam's app pages only, so no other exam's pages
// bundle it.
registerExamBanks({ betoelating: betoelatingQuestions as Question[] });
