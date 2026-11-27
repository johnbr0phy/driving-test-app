import { Question } from "@/types";
import hklesfi7Questions from "@/data/hklesfi7-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HKSI LE Paper 7 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hklesfi7: hklesfi7Questions as Question[] });
