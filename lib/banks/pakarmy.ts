import { Question } from "@/types";
import pakarmyQuestions from "@/data/pak-army-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Pakistan Army soldier recruitment (initial) test bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ pakarmy: pakarmyQuestions as Question[] });
