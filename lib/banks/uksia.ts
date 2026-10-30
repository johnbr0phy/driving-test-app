import { Question } from "@/types";
import uksiaQuestions from "@/data/sia-door-supervisor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SIA door supervisor bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ uksia: uksiaQuestions as Question[] });
