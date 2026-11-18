import { Question } from "@/types";
import questions from "@/data/cdm-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ cdm: questions as Question[] });
