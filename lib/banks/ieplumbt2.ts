import { Question } from "@/types";
import ieplumbt2Questions from "@/data/ie-plumbing-phase2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ireland plumbing apprenticeship Phase 2 bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ ieplumbt2: ieplumbt2Questions as Question[] });
