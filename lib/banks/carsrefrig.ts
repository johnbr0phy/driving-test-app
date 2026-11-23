import { Question } from "@/types";
import carsrefrigQuestions from "@/data/red-seal-refrigeration-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Refrigeration and Air Conditioning Mechanic bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ carsrefrig: carsrefrigQuestions as Question[] });
