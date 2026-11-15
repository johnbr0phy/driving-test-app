import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/nzensf/questions.json";

// Plain array: the enrolled nurse State Final has no shared stimuli.
registerBank("nzensf", plainBank([bank]));
