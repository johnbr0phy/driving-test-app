import { Question } from "@/types";
import epa608Questions from "@/data/epa608-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The epa608 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ epa608: epa608Questions as Question[] });
