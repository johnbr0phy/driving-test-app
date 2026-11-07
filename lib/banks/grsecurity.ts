import { Question } from "@/types";
import grsecurityQuestions from "@/data/gr-security-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Greek private security personnel certification bank (ΕΟΠΠΕΠ, theory part), written in Greek.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ grsecurity: grsecurityQuestions as Question[] });
