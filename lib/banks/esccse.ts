import { Question } from "@/types";
import questions from "@/data/es-ccse-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ esccse: questions as Question[] });
