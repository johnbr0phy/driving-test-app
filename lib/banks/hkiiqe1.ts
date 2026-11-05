import { Question } from "@/types";
import hkiiqe1Questions from "@/data/hkiiqe1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The IIQE Paper 1 (Hong Kong insurance intermediaries) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ hkiiqe1: hkiiqe1Questions as Question[] });
