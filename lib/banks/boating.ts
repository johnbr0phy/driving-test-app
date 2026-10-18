import { Question } from "@/types";
import boatingQuestions from "@/data/boating-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The boating bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ boating: boatingQuestions as Question[] });
