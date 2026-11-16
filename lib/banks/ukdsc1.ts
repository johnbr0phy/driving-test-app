import { Question } from "@/types";
import ukdsc1Questions from "@/data/uk-dsc1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The DSC1 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukdsc1: ukdsc1Questions as Question[] });
