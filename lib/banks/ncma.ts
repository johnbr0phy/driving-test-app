import { Question } from "@/types";
import ncmaQuestions from "@/data/ncma-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NCCT NCMA bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ncma: ncmaQuestions as Question[] });
