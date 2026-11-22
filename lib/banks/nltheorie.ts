import { Question } from "@/types";
import nltheorieQuestions from "@/data/netherlands-driving-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Netherlands driving theory bank (English base; a Dutch translation comes later). Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nltheorie: nltheorieQuestions as Question[] });
