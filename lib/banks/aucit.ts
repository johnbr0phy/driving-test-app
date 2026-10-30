import { Question } from "@/types";
import aucitQuestions from "@/data/aucit-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian citizenship test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aucit: aucitQuestions as Question[] });
