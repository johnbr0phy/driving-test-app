import { Question } from "@/types";
import cdlxQuestions from "@/data/cdl-endorsement-questions.json";
import cdlxQuestionsEs from "@/data/cdl-endorsement-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The cdlx bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cdlx: cdlxQuestions as Question[] }, { cdlx: { es: cdlxQuestionsEs as Question[] } });
