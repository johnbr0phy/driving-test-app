import { Question } from "@/types";
import dktruckQuestions from "@/data/denmark-truck-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Denmark truck theory (teoriprøve, categories C and CE) bank. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ dktruck: dktruckQuestions as Question[] });
