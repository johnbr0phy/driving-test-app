import { Question } from "@/types";
import phltoQuestions from "@/data/philippines-lto-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines LTO driver's license exam bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ phlto: phltoQuestions as Question[] });
