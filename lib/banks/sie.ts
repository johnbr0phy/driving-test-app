import { Question } from "@/types";
import sieQuestions from "@/data/sie-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SIE (FINRA Securities Industry Essentials) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ sie: sieQuestions as Question[] });
