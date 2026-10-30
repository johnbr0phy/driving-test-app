import { Question } from "@/types";
import caweldQuestions from "@/data/red-seal-welder-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal Welder bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caweld: caweldQuestions as Question[] });
