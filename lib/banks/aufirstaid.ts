import { Question } from "@/types";
import aufirstaidQuestions from "@/data/au-first-aid-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian HLTAID011 Provide First Aid bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aufirstaid: aufirstaidQuestions as Question[] });
