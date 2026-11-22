import { Question } from "@/types";
import plcpcQuestions from "@/data/poland-driver-cpc-questions.json";
import plcpcQuestionsPl from "@/data/poland-driver-cpc-questions_pl.json";
import { registerExamBanks } from "@/lib/examData";

// The Poland Driver CPC qualification test bank (English base, Polish translation). Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ plcpc: plcpcQuestions as Question[] }, { plcpc: { pl: plcpcQuestionsPl as Question[] } });
