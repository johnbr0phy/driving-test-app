import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/naplex/questions.json";

// Plain array: the NAPLEX practice bank has no shared stimuli.
registerBank("naplex", plainBank([bank]));
