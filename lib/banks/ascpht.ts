import { Question } from "@/types";
import ascphtQuestions from "@/data/ascp-ht-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HT(ASCP) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ascpht: ascphtQuestions as Question[] });
