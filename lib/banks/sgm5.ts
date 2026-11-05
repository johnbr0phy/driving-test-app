import { Question } from "@/types";
import sgm5Questions from "@/data/sg-cmfas-res5-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore CMFAS RES5 (formerly Module 5) bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ sgm5: sgm5Questions as Question[] });
