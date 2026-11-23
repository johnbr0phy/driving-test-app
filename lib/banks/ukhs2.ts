import { Question } from "@/types";
import ukhs2Questions from "@/data/uk-level-2-health-and-safety-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Level 2 health and safety in the workplace bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ukhs2: ukhs2Questions as Question[] });
