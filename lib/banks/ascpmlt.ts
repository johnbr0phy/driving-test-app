import { Question } from "@/types";
import ascpmltQuestions from "@/data/ascp-mlt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The MLT(ASCP) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ascpmlt: ascpmltQuestions as Question[] });
