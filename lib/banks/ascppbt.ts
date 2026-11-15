import { Question } from "@/types";
import ascppbtQuestions from "@/data/ascp-pbt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PBT(ASCP) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ascppbt: ascppbtQuestions as Question[] });
