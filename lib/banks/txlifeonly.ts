import { Question } from "@/types";
import txlifeonlyQuestions from "@/data/txlifeonly-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Texas Life Agent bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ txlifeonly: txlifeonlyQuestions as Question[] });
