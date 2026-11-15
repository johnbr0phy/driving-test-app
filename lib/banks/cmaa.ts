import { Question } from "@/types";
import cmaaQuestions from "@/data/cmaa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NHA CMAA bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cmaa: cmaaQuestions as Question[] });
