import { Question } from "@/types";
import cmaQuestions from "@/data/cma-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CMA (AAMA) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cma: cmaQuestions as Question[] });
