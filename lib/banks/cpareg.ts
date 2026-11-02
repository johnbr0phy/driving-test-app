import { Question } from "@/types";
import cparegQuestions from "@/data/cpa-reg-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPA Exam REG bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpareg: cparegQuestions as Question[] });
