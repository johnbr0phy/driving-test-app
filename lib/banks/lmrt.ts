import { Question } from "@/types";
import lmrtQuestions from "@/data/limited-scope-xray-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ARRT Limited Scope of Practice in Radiography bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ lmrt: lmrtQuestions as Question[] });
