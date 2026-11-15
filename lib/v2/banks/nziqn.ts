import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/nziqn/questions.json";

// Plain array: the NZ IQN exam has no shared stimuli.
registerBank("nziqn", plainBank([bank]));
