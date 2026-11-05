import { Question } from "@/types";
import phmidwifeQuestions from "@/data/philippines-midwife-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines Midwife Licensure Examination bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ phmidwife: phmidwifeQuestions as Question[] });
