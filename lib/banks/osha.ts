import { Question } from "@/types";
import oshaQuestions from "@/data/osha-questions.json";
import oshaQuestionsEs from "@/data/osha-questions_es.json";
import { registerExamBanks } from "@/lib/examData";

// The osha bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ osha: oshaQuestions as Question[] }, { osha: { es: oshaQuestionsEs as Question[] } });
