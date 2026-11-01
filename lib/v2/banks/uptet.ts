import { registerBank, withStimuli } from "../bank";
import uptetBank from "@/data/v2/uptet/questions.json";

// Object form: the Hindi and English reading passages plus questions.
registerBank("uptet", withStimuli([uptetBank] as Parameters<typeof withStimuli>[0]));
