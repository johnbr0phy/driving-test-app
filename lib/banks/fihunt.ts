import { Question } from "@/types";
import fihuntQuestions from "@/data/finland-hunter-exam-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Finnish hunter's examination bank (metsästäjätutkinto), written in Finnish. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ fihunt: fihuntQuestions as Question[] });
