import { Question } from "@/types";
import ukmotoQuestions from "@/data/uk-motorcycle-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UK motorcycle theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukmoto: ukmotoQuestions as Question[] });
