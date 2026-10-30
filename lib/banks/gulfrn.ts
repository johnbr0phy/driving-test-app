import { Question } from "@/types";
import gulfrnQuestions from "@/data/gulf-nursing-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Gulf registered nurse licensing exam bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ gulfrn: gulfrnQuestions as Question[] });
