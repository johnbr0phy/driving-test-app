import { Question } from "@/types";
import itceliQuestions from "@/data/italy-celi-2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// CELI 2, Italian language certificate level B1 (CVCL, Università per Stranieri di Perugia), in Italian. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ itceli: itceliQuestions as Question[] });
