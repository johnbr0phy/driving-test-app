import { Question } from "@/types";
import rptQuestions from "@/data/rpt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RPT (AMT) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ rpt: rptQuestions as Question[] });
