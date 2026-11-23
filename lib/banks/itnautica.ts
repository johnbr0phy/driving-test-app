import { Question } from "@/types";
import itnauticaQuestions from "@/data/italy-patente-nautica-questions.json";
import { registerExamBanks } from "@/lib/examData";

// Italian boat licence theory test, patente nautica entro 12 miglia (sail and motor), in Italian. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ itnautica: itnauticaQuestions as Question[] });
