import { registerBank, withStimuli } from "../bank";
import reetBank from "@/data/v2/reet/questions.json";

// Object form: the Hindi and English reading passages plus questions.
registerBank("reet", withStimuli([reetBank] as Parameters<typeof withStimuli>[0]));
