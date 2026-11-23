import { Question } from "@/types";
import frmotoQuestions from "@/data/france-code-moto-questions.json";
import { registerExamBanks } from "@/lib/examData";

// French motorcycle licence theory test, categories A1 and A2 (épreuve théorique moto, ETM), in French. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ frmoto: frmotoQuestions as Question[] });
