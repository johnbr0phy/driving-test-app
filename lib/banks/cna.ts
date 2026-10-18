import { Question } from "@/types";
import cnaQuestions from "@/data/cna-questions.json";
import cnaQuestionsEs from "@/data/cna-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The cna bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cna: cnaQuestions as Question[] }, { cna: { es: cnaQuestionsEs as Question[] } });
