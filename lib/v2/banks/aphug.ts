import { registerBank, withStimuli } from "../bank";
import aphugBank from "@/data/v2/aphug/questions.json";

// Object form: the shared practice stimuli (hypothetical tables; maps, landscapes and a pyramid described in words) plus questions.
registerBank("aphug", withStimuli([aphugBank] as Parameters<typeof withStimuli>[0]));
