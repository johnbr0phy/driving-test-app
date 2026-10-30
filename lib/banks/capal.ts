import { Question } from "@/types";
import capalQuestions from "@/data/canadian-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Canadian Firearms Safety Course (PAL, non-restricted) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ capal: capalQuestions as Question[] });
