import { Question } from "@/types";
import ascpmlsQuestions from "@/data/ascp-mls-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The MLS(ASCP) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ascpmls: ascpmlsQuestions as Question[] });
