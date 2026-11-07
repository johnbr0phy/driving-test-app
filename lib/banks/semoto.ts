import { Question } from "@/types";
import semotoQuestions from "@/data/sweden-motorcycle-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Sweden motorcycle knowledge test bank (A1, A2 and A), written in Swedish. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ semoto: semotoQuestions as Question[] });
