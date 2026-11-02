import { Question } from "@/types";
import nceQuestions from "@/data/nce-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NCE bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nce: nceQuestions as Question[] });
