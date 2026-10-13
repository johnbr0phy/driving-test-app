import { registerBank, withStimuli } from "../bank";
import nclexBank from "@/data/v2/nclex/questions.json";

// Object form: case-study stimuli plus questions.
registerBank("nclex", withStimuli([nclexBank] as Parameters<typeof withStimuli>[0]));
