import { Question } from "@/types";
import danbrhsQuestions from "@/data/danb-rhs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The DANB Radiation Health and Safety bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ danbrhs: danbrhsQuestions as Question[] });
