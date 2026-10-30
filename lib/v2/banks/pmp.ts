import { registerBank, withStimuli } from "../bank";
import pmpBank from "@/data/v2/pmp/questions.json";

// Object form: the two case-study stimuli plus questions.
registerBank("pmp", withStimuli([pmpBank] as Parameters<typeof withStimuli>[0]));
