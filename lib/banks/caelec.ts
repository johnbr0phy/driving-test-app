import { Question } from "@/types";
import caelecQuestions from "@/data/red-seal-electrician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Construction Electrician bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ caelec: caelecQuestions as Question[] });
