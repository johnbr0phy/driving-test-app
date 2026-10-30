import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/fsmaths/questions.json";

// Built by tools/fsmaths/build.py from tools/fsmaths/q_*.py (every answer is
// computed there, never typed). Plain array, no shared stimuli.
registerBank("fsmaths", plainBank([bank]));
