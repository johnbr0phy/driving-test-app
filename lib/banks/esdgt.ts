import { Question } from "@/types";
import esdgtQuestions from "@/data/spain-dgt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Spain DGT theory exam bank (permiso B, in English). Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ esdgt: esdgtQuestions as Question[] });
