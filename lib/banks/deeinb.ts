import { Question } from "@/types";
import questions from "@/data/de-einbuergerungstest-questions.json";
import { registerExamBanks } from "@/lib/examData";

registerExamBanks({ deeinb: questions as Question[] });
