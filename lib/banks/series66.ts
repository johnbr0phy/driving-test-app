import { Question } from "@/types";
import series66Questions from "@/data/series-66-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Series 66 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ series66: series66Questions as Question[] });
