import { Question } from "@/types";
import series7Questions from "@/data/series-7-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Series 7 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ series7: series7Questions as Question[] });
