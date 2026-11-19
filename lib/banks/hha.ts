import { Question } from "@/types";
import hhaQuestions from "@/data/hha-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The home health aide bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ hha: hhaQuestions as Question[] });
