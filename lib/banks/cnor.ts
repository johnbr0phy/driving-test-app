import { Question } from "@/types";
import cnorQuestions from "@/data/cnor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCI CNOR bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cnor: cnorQuestions as Question[] });
