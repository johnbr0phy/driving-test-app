import { Question } from "@/types";
import iehcapQuestions from "@/data/ie-hcap-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Irish HCAP deer hunter bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ iehcap: iehcapQuestions as Question[] });
