import { Question } from "@/types";
import notaryQuestions from "@/data/notary-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The notary bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ notary: notaryQuestions as Question[] });
