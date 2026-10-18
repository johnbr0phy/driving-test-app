import { Question } from "@/types";
import crcstQuestions from "@/data/crcst-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The crcst bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ crcst: crcstQuestions as Question[] });
