import { Question } from "@/types";
import cbspdQuestions from "@/data/cbspd-cspdt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CBSPD CSPDT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cbspd: cbspdQuestions as Question[] });
