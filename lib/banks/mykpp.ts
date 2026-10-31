import { Question } from "@/types";
import mykppQuestions from "@/data/malaysia-kpp-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malaysia KPP01 theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ mykpp: mykppQuestions as Question[] });
