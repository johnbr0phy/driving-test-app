import { Question } from "@/types";
import frm1Questions from "@/data/frm-part-1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The GARP FRM Exam Part I bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ frm1: frm1Questions as Question[] });
