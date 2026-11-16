import { Question } from "@/types";
import chtheoryQuestions from "@/data/switzerland-driving-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Switzerland driving theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ chtheory: chtheoryQuestions as Question[] });
