import { registerBank, withStimuli } from "../bank";
import jkssbjaBank from "@/data/v2/jkssbja/questions.json";

// Object form: two reading passages plus questions.
registerBank("jkssbja", withStimuli([jkssbjaBank] as Parameters<typeof withStimuli>[0]));
