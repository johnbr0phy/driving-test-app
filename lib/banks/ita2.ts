import { Question } from "@/types";
import ita2Questions from "@/data/italy-test-italiano-a2-questions.json";
import { registerExamBanks } from "@/lib/examData";

// Italian A2 test for the EU long-term residence permit (Prefettura), in Italian. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ita2: ita2Questions as Question[] });
