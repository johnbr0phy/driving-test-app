import { Question } from "@/types";
import nlvcaQuestions from "@/data/vca-basic-safety-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The VCA Basic Safety (B-VCA) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nlvca: nlvcaQuestions as Question[] });
