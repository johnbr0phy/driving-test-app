import { Question } from "@/types";
import hklesfi8Questions from "@/data/hklesfi8-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HKSI LE Paper 8 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hklesfi8: hklesfi8Questions as Question[] });
