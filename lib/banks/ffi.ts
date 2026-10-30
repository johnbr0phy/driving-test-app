import { Question } from "@/types";
import ffiQuestions from "@/data/firefighter-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Firefighter I bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ffi: ffiQuestions as Question[] });
