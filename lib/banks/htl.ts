import { Question } from "@/types";
import htlQuestions from "@/data/htl-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The htl bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ htl: htlQuestions as Question[] });
