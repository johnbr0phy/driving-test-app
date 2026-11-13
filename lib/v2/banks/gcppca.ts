import { registerBank, withStimuli } from "../bank";
import bank from "@/data/v2/gcppca/questions.json";

// Object form: four original case-study stimuli plus questions.
registerBank("gcppca", withStimuli([bank] as Parameters<typeof withStimuli>[0]));
