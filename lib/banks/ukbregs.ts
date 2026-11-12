import { Question } from "@/types";
import ukbregsQuestions from "@/data/uk-building-regulations-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Building Regs bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukbregs: ukbregsQuestions as Question[] });
