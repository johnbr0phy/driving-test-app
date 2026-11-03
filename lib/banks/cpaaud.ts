import { Question } from "@/types";
import cpaaudQuestions from "@/data/cpa-aud-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CPA Exam AUD bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cpaaud: cpaaudQuestions as Question[] });
