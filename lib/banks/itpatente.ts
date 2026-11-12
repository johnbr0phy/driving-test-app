import { Question } from "@/types";
import itpatenteQuestions from "@/data/italy-patente-questions.json";
import { registerExamBanks } from "@/lib/examData";

// Italian driving licence theory test, category B car (quiz patente B), in Italian. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ itpatente: itpatenteQuestions as Question[] });
