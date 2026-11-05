import { Question } from "@/types";
import hklesfi1Questions from "@/data/hk-le-paper-1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hong Kong LE Paper 1 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hklesfi1: hklesfi1Questions as Question[] });
