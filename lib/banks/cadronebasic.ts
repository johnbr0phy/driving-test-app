import { Question } from "@/types";
import cadronebasicQuestions from "@/data/canada-drone-basic-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Transport Canada Small Basic Exam (drone pilot, basic operations) bank. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cadronebasic: cadronebasicQuestions as Question[] });
