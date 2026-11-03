import { Question } from "@/types";
import txadjusterQuestions from "@/data/texas-adjuster-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Texas all-lines adjuster bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ txadjuster: txadjusterQuestions as Question[] });
