import { Question } from "@/types";
import ukg3Questions from "@/data/uk-unvented-g3-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Unvented G3 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukg3: ukg3Questions as Question[] });
