import { registerBank, withStimuli } from "../bank";
import sbiclerkBank from "@/data/v2/sbiclerk/questions.json";

// Object form: reading, cloze, data interpretation and puzzle stimuli plus questions.
registerBank("sbiclerk", withStimuli([sbiclerkBank] as Parameters<typeof withStimuli>[0]));
