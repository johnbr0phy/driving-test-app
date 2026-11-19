import { Question } from "@/types";
import cbcsQuestions from "@/data/cbcs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NHA CBCS bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ cbcs: cbcsQuestions as Question[] });
