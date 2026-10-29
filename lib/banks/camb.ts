import { Question } from "@/types";
import cambQuestions from "@/data/manitoba-class-5-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Manitoba Class 5 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ camb: cambQuestions as Question[] });
