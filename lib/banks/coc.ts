import { Question } from "@/types";
import cocQuestions from "@/data/coc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AAPC COC bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ coc: cocQuestions as Question[] });
