import { Question } from "@/types";
import questions from "@/data/appraiser-questions.json";
import { registerExamBanks } from "@/lib/examData";
registerExamBanks({ appraiser: questions as Question[] });
