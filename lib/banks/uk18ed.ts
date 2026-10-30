import { Question } from "@/types";
import uk18edQuestions from "@/data/uk-18th-edition-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The 18th Edition (BS 7671, City & Guilds 2382) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ uk18ed: uk18edQuestions as Question[] });
