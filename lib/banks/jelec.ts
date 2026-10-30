import { Question } from "@/types";
import jelecQuestions from "@/data/journeyman-electrician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The journeyman electrician bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ jelec: jelecQuestions as Question[] });
