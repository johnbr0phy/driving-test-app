import { registerBank, withStimuli } from "../bank";
import ibpsclerkBank from "@/data/v2/ibpsclerk/questions.json";

// Object form: reading, para jumble, cloze, data interpretation and puzzle stimuli plus questions.
registerBank("ibpsclerk", withStimuli([ibpsclerkBank] as Parameters<typeof withStimuli>[0]));
