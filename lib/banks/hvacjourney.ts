import { Question } from "@/types";
import hvacjourneyQuestions from "@/data/hvac-journeyman-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The hvacjourney bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hvacjourney: hvacjourneyQuestions as Question[] });
