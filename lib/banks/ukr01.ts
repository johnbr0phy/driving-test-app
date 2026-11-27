import { Question } from "@/types";
import ukr01Questions from "@/data/ukr01-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CII R01 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukr01: ukr01Questions as Question[] });
