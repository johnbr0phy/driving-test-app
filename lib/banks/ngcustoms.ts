import { Question } from "@/types";
import ngcustomsQuestions from "@/data/nigeria-customs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nigeria Customs Service recruitment CBT bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ ngcustoms: ngcustomsQuestions as Question[] });
