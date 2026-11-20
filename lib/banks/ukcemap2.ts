import { Question } from "@/types";
import ukcemap2Questions from "@/data/cemap-2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CeMAP Module 2 (MORT: MRT1 and MRT2) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ ukcemap2: ukcemap2Questions as Question[] });
