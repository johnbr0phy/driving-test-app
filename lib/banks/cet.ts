import { Question } from "@/types";
import cetQuestions from "@/data/cet-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The cet bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cet: cetQuestions as Question[] });
