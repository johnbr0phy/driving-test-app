import { Question } from "@/types";
import aatl2Questions from "@/data/aat-level-2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AAT Level 2 Certificate in Accounting bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ aatl2: aatl2Questions as Question[] });
