import { Question } from "@/types";
import cpabarQuestions from "@/data/cpa-bar-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPA Exam BAR bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpabar: cpabarQuestions as Question[] });
