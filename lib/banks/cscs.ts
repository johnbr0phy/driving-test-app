import { Question } from "@/types";
import cscsQuestions from "@/data/cscs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CITB HS&E test (CSCS) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cscs: cscsQuestions as Question[] });
