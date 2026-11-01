import { Question } from "@/types";
import setrafikQuestions from "@/data/sweden-driving-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Sweden driving theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ setrafik: setrafikQuestions as Question[] });
