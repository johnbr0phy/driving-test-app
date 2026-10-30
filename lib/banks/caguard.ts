import { Question } from "@/types";
import caguardQuestions from "@/data/ontario-security-guard-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ontario security guard bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caguard: caguardQuestions as Question[] });
