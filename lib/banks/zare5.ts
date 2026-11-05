import { Question } from "@/types";
import zare5Questions from "@/data/re5-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RE5 (South Africa, FAIS representatives) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ zare5: zare5Questions as Question[] });
