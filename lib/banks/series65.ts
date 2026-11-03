import { Question } from "@/types";
import series65Questions from "@/data/series-65-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Series 65 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ series65: series65Questions as Question[] });
