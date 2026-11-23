import { Question } from "@/types";
import series24Questions from "@/data/series-24-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Series 24 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ series24: series24Questions as Question[] });
