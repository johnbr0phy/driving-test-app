import { Question } from "@/types";
import realestateQuestions from "@/data/real-estate-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The realestate bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ realestate: realestateQuestions as Question[] });
