import { Question } from "@/types";
import questions from "@/data/epa609-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ epa609: questions as Question[] });
