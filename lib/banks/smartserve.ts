import { Question } from "@/types";
import smartserveQuestions from "@/data/smart-serve-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Smart Serve Ontario bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ smartserve: smartserveQuestions as Question[] });
