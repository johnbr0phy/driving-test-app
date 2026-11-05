import { Question } from "@/types";
import nzfirearmsQuestions from "@/data/nz-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand firearms licence theory test bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzfirearms: nzfirearmsQuestions as Question[] });
