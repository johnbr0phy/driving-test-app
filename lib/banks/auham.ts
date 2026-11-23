import { Question } from "@/types";
import auhamQuestions from "@/data/au-amateur-radio-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian amateur radio Foundation bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ auham: auhamQuestions as Question[] });
