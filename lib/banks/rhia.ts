import { Question } from "@/types";
import rhiaQuestions from "@/data/rhia-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RHIA bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ rhia: rhiaQuestions as Question[] });
