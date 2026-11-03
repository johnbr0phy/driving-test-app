import { Question } from "@/types";
import series63Questions from "@/data/series-63-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Series 63 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ series63: series63Questions as Question[] });
