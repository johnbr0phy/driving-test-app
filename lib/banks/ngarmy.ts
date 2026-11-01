import { Question } from "@/types";
import ngarmyQuestions from "@/data/nigerian-army-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nigerian Army recruitment aptitude test bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ ngarmy: ngarmyQuestions as Question[] });
