import { Question } from "@/types";
import pcocQuestions from "@/data/pcoc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Pleasure Craft Operator Card (Canada) bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ pcoc: pcocQuestions as Question[] });
