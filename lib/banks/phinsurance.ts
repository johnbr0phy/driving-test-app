import { Question } from "@/types";
import phinsuranceQuestions from "@/data/philippines-insurance-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines Insurance Commission traditional life agent exam bank. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ phinsurance: phinsuranceQuestions as Question[] });
