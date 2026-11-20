import { Question } from "@/types";
import cctQuestions from "@/data/cct-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCI CCT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cct: cctQuestions as Question[] });
