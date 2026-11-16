import { Question } from "@/types";
import cacoreQuestions from "@/data/bc-core-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The BC CORE hunter exam bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ cacore: cacoreQuestions as Question[] });
