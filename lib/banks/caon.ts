import { Question } from "@/types";
import caonQuestions from "@/data/ontario-g1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ontario G1 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caon: caonQuestions as Question[] });
