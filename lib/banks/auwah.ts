import { Question } from "@/types";
import auwahQuestions from "@/data/working-at-heights-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian working at heights (RIIWHS204) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ auwah: auwahQuestions as Question[] });
