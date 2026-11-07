import { Question } from "@/types";
import dkjagtQuestions from "@/data/dk-jagtproeve-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Danish hunting licence test bank (jagtprøven, skriftlig del), written in Danish. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ dkjagt: dkjagtQuestions as Question[] });
