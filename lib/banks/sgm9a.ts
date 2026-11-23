import { Question } from "@/types";
import sgm9aQuestions from "@/data/sg-cmfas-m9a-questions.json";
import { registerExamBanks } from "@/lib/examData";

// Singapore CMFAS Module 9A (Life Insurance and Investment-Linked Policies II) bank.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ sgm9a: sgm9aQuestions as Question[] });
