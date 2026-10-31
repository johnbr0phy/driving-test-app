import { Question } from "@/types";
import kentsaQuestions from "@/data/kenya-ntsa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Kenya NTSA driving test theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ kentsa: kentsaQuestions as Question[] });
