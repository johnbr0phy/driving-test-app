import { Question } from "@/types";
import proserveQuestions from "@/data/proserve-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AGLC ProServe (Alberta liquor staff training) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ proserve: proserveQuestions as Question[] });
