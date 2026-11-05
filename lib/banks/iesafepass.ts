import { Question } from "@/types";
import iesafepassQuestions from "@/data/safe-pass-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Irish Safe Pass bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ iesafepass: iesafepassQuestions as Question[] });
