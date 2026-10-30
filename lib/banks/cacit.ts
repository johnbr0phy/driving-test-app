import { Question } from "@/types";
import cacitQuestions from "@/data/canadian-citizenship-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Canadian citizenship test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cacit: cacitQuestions as Question[] });
