import { Question } from "@/types";
import ncmhceQuestions from "@/data/ncmhce-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NCMHCE bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ncmhce: ncmhceQuestions as Question[] });
