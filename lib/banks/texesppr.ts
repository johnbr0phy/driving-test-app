import { Question } from "@/types";
import texespprQuestions from "@/data/texes-ppr-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The TExES PPR EC-12 (160) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ texesppr: texespprQuestions as Question[] });
