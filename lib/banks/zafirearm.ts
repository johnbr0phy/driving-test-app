import { Question } from "@/types";
import questions from "@/data/zafirearm-questions.json";
import { registerExamBanks } from "@/lib/examData";
registerExamBanks({ zafirearm: questions as Question[] });
