import { Question } from "@/types";
import cpatcpQuestions from "@/data/cpa-tcp-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPA Exam TCP bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpatcp: cpatcpQuestions as Question[] });
