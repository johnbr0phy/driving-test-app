import { Question } from "@/types";
import ea3Questions from "@/data/enrolled-agent-part-3-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The IRS Enrolled Agent SEE Part 3 (Representation, Practices and Procedures) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ea3: ea3Questions as Question[] });
