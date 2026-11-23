import { Question } from "@/types";
import ausecurityQuestions from "@/data/au-security-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian security licence course (CPP20218) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ausecurity: ausecurityQuestions as Question[] });
