import { Question } from "@/types";
import ncptQuestions from "@/data/ncpt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NCCT NCPT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ncpt: ncptQuestions as Question[] });
