import { Question } from "@/types";
import nzlcqQuestions from "@/data/nz-lcq-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The LCQ (New Zealand Licence Controller Qualification) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzlcq: nzlcqQuestions as Question[] });
