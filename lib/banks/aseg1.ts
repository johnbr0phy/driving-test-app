import { Question } from "@/types";
import aseg1Questions from "@/data/ase-g1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASE G1 Auto Maintenance and Light Repair bank (220 items, seven content area pools). Imported
// for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ aseg1: aseg1Questions as Question[] });
