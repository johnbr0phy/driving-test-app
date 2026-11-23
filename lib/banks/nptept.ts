import { Question } from "@/types";
import nptQuestions from "@/data/nptept-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NPTE-PT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nptept: nptQuestions as Question[] });
