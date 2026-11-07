import { Question } from "@/types";
import ptcamQuestions from "@/data/portugal-cam-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal CAM (Driver CPC) bank, written in European Portuguese. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ptcam: ptcamQuestions as Question[] });
