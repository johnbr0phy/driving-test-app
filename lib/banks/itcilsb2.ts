import { Question } from "@/types";
import itcilsb2Questions from "@/data/italy-cils-b2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// CILS DUE-B2, Italian B2 certificate (Università per Stranieri di Siena), in Italian. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ itcilsb2: itcilsb2Questions as Question[] });
