import { Question } from "@/types";
import cfal1Questions from "@/data/cfa-level-1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CFA Program Level I bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cfal1: cfal1Questions as Question[] });
