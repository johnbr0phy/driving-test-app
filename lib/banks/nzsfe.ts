import { Question } from "@/types";
import nzsfeQuestions from "@/data/nz-nursing-state-final-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nursing Council of New Zealand State Final Examination (registered nurse) bank. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzsfe: nzsfeQuestions as Question[] });
