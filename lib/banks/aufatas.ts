import { Question } from "@/types";
import aufatasQuestions from "@/data/tas-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The WA firearm safety training bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aufatas: aufatasQuestions as Question[] });
