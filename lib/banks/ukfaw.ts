import { Question } from "@/types";
import ukfawQuestions from "@/data/first-aid-at-work-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UK First Aid at Work bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukfaw: ukfawQuestions as Question[] });
