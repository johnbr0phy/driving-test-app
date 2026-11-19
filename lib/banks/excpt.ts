import { Question } from "@/types";
import excptQuestions from "@/data/excpt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NHA ExCPT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ excpt: excptQuestions as Question[] });
