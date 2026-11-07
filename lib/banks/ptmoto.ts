import { Question } from "@/types";
import ptmotoQuestions from "@/data/portugal-motorcycle-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal IMT motorcycle theory (categories A1, A2 and A) bank, in English. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ptmoto: ptmotoQuestions as Question[] });
