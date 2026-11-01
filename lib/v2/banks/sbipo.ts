import { registerBank, withStimuli } from "../bank";
import sbipoBank from "@/data/v2/sbipo/questions.json";

// Object form: reading, cloze, para jumble, data interpretation and puzzle stimuli plus questions.
registerBank("sbipo", withStimuli([sbipoBank] as Parameters<typeof withStimuli>[0]));
