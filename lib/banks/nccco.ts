import { Question } from "@/types";
import questions from "@/data/nccco-questions.json";
import { registerExamBanks } from "@/lib/examData";
registerExamBanks({ nccco: questions as Question[] });
