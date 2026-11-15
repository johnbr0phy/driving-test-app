import { Question } from "@/types";
import rmaQuestions from "@/data/rma-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RMA (AMT) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ rma: rmaQuestions as Question[] });
