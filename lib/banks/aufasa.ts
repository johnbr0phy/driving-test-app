import { Question } from "@/types";
import aufasaQuestions from "@/data/sa-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The South Australia firearms safety bank (Firearms Act 2015 (SA)). Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ aufasa: aufasaQuestions as Question[] });
