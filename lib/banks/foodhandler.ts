import { Question } from "@/types";
import foodhandlerQuestions from "@/data/food-handler-questions.json";
import foodhandlerQuestionsEs from "@/data/food-handler-questions_es.json";
import foodhandlerQuestionsVi from "@/data/food-handler-questions_vi.json";
import foodhandlerQuestionsKo from "@/data/food-handler-questions_ko.json";
import { registerExamBanks } from "@/lib/examData";

// The foodhandler bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ foodhandler: foodhandlerQuestions as Question[] }, { foodhandler: { es: foodhandlerQuestionsEs as Question[], vi: foodhandlerQuestionsVi as Question[], ko: foodhandlerQuestionsKo as Question[] } });
