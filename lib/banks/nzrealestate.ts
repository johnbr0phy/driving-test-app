import { Question } from "@/types";
import nzrealestateQuestions from "@/data/nz-real-estate-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NZ real estate salesperson bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nzrealestate: nzrealestateQuestions as Question[] });
