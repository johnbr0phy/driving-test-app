import { registerBank, withStimuli } from "../bank";
import nclexpnBank from "@/data/v2/nclexpn/questions.json";

// Object form: case-study stimuli plus questions.
registerBank("nclexpn", withStimuli([nclexpnBank] as Parameters<typeof withStimuli>[0]));
