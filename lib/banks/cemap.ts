import { Question } from "@/types";
import cemapQuestions from "@/data/cemap-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CeMAP Module 1 (FSRE) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cemap: cemapQuestions as Question[] });
