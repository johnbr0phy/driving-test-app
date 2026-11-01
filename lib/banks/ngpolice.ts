import { Question } from "@/types";
import ngpoliceQuestions from "@/data/nigeria-police-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nigeria Police recruitment bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ngpolice: ngpoliceQuestions as Question[] });
