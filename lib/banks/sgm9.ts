import { Question } from "@/types";
import sgm9Questions from "@/data/sg-cmfas-m9-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore CMFAS M9 (Life Insurance and Investment-Linked Policies) bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ sgm9: sgm9Questions as Question[] });
