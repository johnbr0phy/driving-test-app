import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/uknmc/questions.json";

// Plain array: the NMC CBT has no shared stimuli.
registerBank("uknmc", plainBank([bank]));
