import { Question } from "@/types";
import cehrsQuestions from "@/data/cehrs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NHA CEHRS bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cehrs: cehrsQuestions as Question[] });
