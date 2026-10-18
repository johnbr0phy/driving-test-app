import { Question } from "@/types";
import forkliftQuestions from "@/data/forklift-questions.json";
import forkliftQuestionsEs from "@/data/forklift-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The forklift bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ forklift: forkliftQuestions as Question[] }, { forklift: { es: forkliftQuestionsEs as Question[] } });
