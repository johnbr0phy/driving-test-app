import { Question } from "@/types";
import aunswQuestions from "@/data/nsw-dkt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NSW DKT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aunsw: aunswQuestions as Question[] });
