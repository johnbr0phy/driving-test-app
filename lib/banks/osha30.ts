import { Question } from "@/types";
import osha30Questions from "@/data/osha30-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The osha30 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ osha30: osha30Questions as Question[] });
