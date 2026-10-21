import { Question } from "@/types";
import vtneQuestions from "@/data/vtne-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The VTNE bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ vtne: vtneQuestions as Question[] });
