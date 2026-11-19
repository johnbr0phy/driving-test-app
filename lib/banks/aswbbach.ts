import { Question } from "@/types";
import aswbbachQuestions from "@/data/aswb-bachelors-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASWB Bachelors bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ aswbbach: aswbbachQuestions as Question[] });
