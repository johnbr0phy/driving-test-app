import { registerBank, withStimuli } from "../bank";
import ibpspoBank from "@/data/v2/ibpspo/questions.json";

// Object form: reading, cloze, para jumble, data interpretation and puzzle stimuli plus questions.
registerBank("ibpspo", withStimuli([ibpspoBank] as Parameters<typeof withStimuli>[0]));
