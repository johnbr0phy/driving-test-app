import { Question } from "@/types";
import cdlQuestions from "@/data/cdl-questions.json";
import cdlQuestionsEs from "@/data/cdl-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The cdl bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cdl: cdlQuestions as Question[] }, { cdl: { es: cdlQuestionsEs as Question[] } });
