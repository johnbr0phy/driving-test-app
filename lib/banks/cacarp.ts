import { Question } from "@/types";
import cacarpQuestions from "@/data/red-seal-carpenter-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Red Seal carpenter bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cacarp: cacarpQuestions as Question[] });
