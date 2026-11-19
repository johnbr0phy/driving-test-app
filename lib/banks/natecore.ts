import { Question } from "@/types";
import natecoreQuestions from "@/data/nate-core-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The natecore bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ natecore: natecoreQuestions as Question[] });
