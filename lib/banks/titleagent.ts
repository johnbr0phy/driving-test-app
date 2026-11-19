import { Question } from "@/types";
import titleagentQuestions from "@/data/title-agent-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The title insurance agent bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ titleagent: titleagentQuestions as Question[] });
