import { Question } from "@/types";
import dkmotoQuestions from "@/data/denmark-motorcycle-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Denmark motorcycle theory (teoriprøve, categories A1, A2 and A) bank. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ dkmoto: dkmotoQuestions as Question[] });
