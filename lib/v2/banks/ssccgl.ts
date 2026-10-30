import { registerBank, withStimuli } from "../bank";
import ssccglBank from "@/data/v2/ssccgl/questions.json";

// Object form: the two cloze passages and two reading passages plus questions.
registerBank("ssccgl", withStimuli([ssccglBank] as Parameters<typeof withStimuli>[0]));
