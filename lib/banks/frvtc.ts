import { Question } from "@/types";
import questions from "@/data/france-vtc-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ frvtc: questions as Question[] });
