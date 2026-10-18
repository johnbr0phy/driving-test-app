import { Question } from "@/types";
import hamQuestions from "@/data/ham-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ham bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ham: hamQuestions as Question[] });
