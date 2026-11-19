import { Question } from "@/types";
import cpbQuestions from "@/data/cpb-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AAPC CPB bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ cpb: cpbQuestions as Question[] });
