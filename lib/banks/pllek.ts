import { Question } from "@/types";
import pllekQuestions from "@/data/poland-lek-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Poland LEK bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ pllek: pllekQuestions as Question[] });
