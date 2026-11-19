import { Question } from "@/types";
import ea2Questions from "@/data/enrolled-agent-part-2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The IRS Enrolled Agent SEE Part 2 (Businesses) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ea2: ea2Questions as Question[] });
