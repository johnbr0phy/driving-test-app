import { Question } from "@/types";
import ukplumbQuestions from "@/data/uk-plumbing-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Plumbing Theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukplumb: ukplumbQuestions as Question[] });
