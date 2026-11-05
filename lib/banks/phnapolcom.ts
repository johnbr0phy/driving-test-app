import { Question } from "@/types";
import phnapolcomQuestions from "@/data/philippines-napolcom-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NAPOLCOM PNP Entrance Examination bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ phnapolcom: phnapolcomQuestions as Question[] });
