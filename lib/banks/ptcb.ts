import { Question } from "@/types";
import ptcbQuestions from "@/data/ptcb-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ptcb bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ptcb: ptcbQuestions as Question[] });
