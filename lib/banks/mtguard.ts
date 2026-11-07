import { Question } from "@/types";
import mtguardQuestions from "@/data/malta-private-guard-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malta private guard licence (Award in Private Security Guard Services) bank. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ mtguard: mtguardQuestions as Question[] });
