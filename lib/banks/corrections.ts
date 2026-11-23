import { Question } from "@/types";
import correctionsQuestions from "@/data/corrections-officer-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The correctional officer entrance exam bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ corrections: correctionsQuestions as Question[] });
