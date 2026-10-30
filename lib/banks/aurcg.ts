import { Question } from "@/types";
import aurcgQuestions from "@/data/au-rcg-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RCG (SITHGAM022 Provide responsible gambling services, Australia) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ aurcg: aurcgQuestions as Question[] });
