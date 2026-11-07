import { Question } from "@/types";
import grinsureQuestions from "@/data/gr-insurance-intermediary-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Bank of Greece insurance intermediary certification bank, written in Greek. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ grinsure: grinsureQuestions as Question[] });
