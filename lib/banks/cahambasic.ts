import { Question } from "@/types";
import cahambasicQuestions from "@/data/canada-amateur-radio-basic-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Canadian amateur radio Basic Qualification bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cahambasic: cahambasicQuestions as Question[] });
