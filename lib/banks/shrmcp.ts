import { Question } from "@/types";
import shrmcpQuestions from "@/data/shrmcp-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SHRM-CP bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ shrmcp: shrmcpQuestions as Question[] });
