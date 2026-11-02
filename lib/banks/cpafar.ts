import { Question } from "@/types";
import cpafarQuestions from "@/data/cpa-far-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPA Exam FAR bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpafar: cpafarQuestions as Question[] });
