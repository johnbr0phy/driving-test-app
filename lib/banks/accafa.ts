import { Question } from "@/types";
import accafaQuestions from "@/data/acca-fa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ACCA Financial Accounting (FA) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ accafa: accafaQuestions as Question[] });
