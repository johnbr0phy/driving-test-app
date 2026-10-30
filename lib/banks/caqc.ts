import { Question } from "@/types";
import caqcQuestions from "@/data/saaq-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Quebec SAAQ bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ caqc: caqcQuestions as Question[] });
