import { Question } from "@/types";
import rocpiQuestions from "@/data/romania-cpi-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Romania ARR Driver CPC initial qualification (CPI) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ rocpi: rocpiQuestions as Question[] });
