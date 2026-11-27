import { Question } from "@/types";
import ukif1Questions from "@/data/ukif1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CII IF1 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukif1: ukif1Questions as Question[] });
