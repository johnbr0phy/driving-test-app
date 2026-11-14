import { Question } from "@/types";
import frcodeQuestions from "@/data/france-code-route-questions.json";
import { registerExamBanks } from "@/lib/examData";

// French driving licence theory test, category B car (épreuve théorique générale, code de la route), in French. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ frcode: frcodeQuestions as Question[] });
