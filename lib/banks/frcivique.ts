import { Question } from "@/types";
import questions from "@/data/france-examen-civique-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ frcivique: questions as Question[] });
