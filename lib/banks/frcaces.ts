import { Question } from "@/types";
import frcacesQuestions from "@/data/france-caces-r489-questions.json";
import { registerExamBanks } from "@/lib/examData";

// French CACES R489 theory test for ride-on forklifts and industrial trucks, in French. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ frcaces: frcacesQuestions as Question[] });
