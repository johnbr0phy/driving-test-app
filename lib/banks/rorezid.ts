import { Question } from "@/types";
import rorezidQuestions from "@/data/romania-rezidentiat-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Romanian medical residency exam bank (Rezidențiat, domeniul Medicină), written in Romanian.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ rorezid: rorezidQuestions as Question[] });
