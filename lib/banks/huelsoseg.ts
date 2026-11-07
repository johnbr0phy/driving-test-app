import { Question } from "@/types";
import huelsosegQuestions from "@/data/hungary-first-aid-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hungarian road first aid exam bank (közúti elsősegélynyújtási vizsga), written in
// Hungarian. Imported for its side effect by this exam's app pages only, so no other exam's
// pages bundle it.
registerExamBanks({ huelsoseg: huelsosegQuestions as Question[] });
