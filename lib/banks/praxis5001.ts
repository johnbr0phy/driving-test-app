import { Question } from "@/types";
import praxis5001Questions from "@/data/praxis-elementary-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Praxis Elementary Education: Multiple Subjects (5001) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ praxis5001: praxis5001Questions as Question[] });
