import type { Question } from "@/types";
import questions from "@/data/realestatebroker-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ realestatebroker: questions as Question[] });
