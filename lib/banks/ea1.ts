import { Question } from "@/types";
import ea1Questions from "@/data/enrolled-agent-part-1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The IRS Enrolled Agent SEE Part 1 (Individuals) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ea1: ea1Questions as Question[] });
