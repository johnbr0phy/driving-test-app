import { Question } from "@/types";
import hspacerQuestions from "@/data/hspa-cer-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HSPA CER bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hspacer: hspacerQuestions as Question[] });
