import { Question } from "@/types";
import auwhiteQuestions from "@/data/white-card-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The White Card (CPCWHS1001) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ auwhite: auwhiteQuestions as Question[] });
