import { Question } from "@/types";
import aufirearmsvicQuestions from "@/data/vic-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Victorian firearm safety bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aufirearmsvic: aufirearmsvicQuestions as Question[] });
