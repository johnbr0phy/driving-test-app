import { Question } from "@/types";
import inrtoQuestions from "@/data/india-learners-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// India's RTO learner's licence (LL) test bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ inrto: inrtoQuestions as Question[] });
