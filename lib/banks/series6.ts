import { Question } from "@/types";
import series6Questions from "@/data/series-6-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Series 6 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ series6: series6Questions as Question[] });
