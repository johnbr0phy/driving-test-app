import { Question } from "@/types";
import aufirearmsnswQuestions from "@/data/nsw-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NSW firearms safety bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aufirearmsnsw: aufirearmsnswQuestions as Question[] });
