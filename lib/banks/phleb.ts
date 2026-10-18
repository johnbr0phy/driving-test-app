import { Question } from "@/types";
import phlebQuestions from "@/data/phlebotomy-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The phleb bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ phleb: phlebQuestions as Question[] });
