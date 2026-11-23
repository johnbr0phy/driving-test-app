import { Question } from "@/types";
import epppQuestions from "@/data/eppp-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The eppp bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ eppp: epppQuestions as Question[] });
