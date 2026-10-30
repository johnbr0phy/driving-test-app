import { Question } from "@/types";
import policeQuestions from "@/data/police-exam-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The police entrance exam bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ police: policeQuestions as Question[] });
