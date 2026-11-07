import { Question } from "@/types";
import hugkiQuestions from "@/data/hungary-gki-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hungary GKI (Driver CPC) theory exam bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hugki: hugkiQuestions as Question[] });
