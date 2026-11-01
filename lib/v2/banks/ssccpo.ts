import { registerBank, withStimuli } from "../bank";
import ssccpoBank from "@/data/v2/ssccpo/questions.json";

// Object form: the two cloze passages and two reading passages plus questions.
registerBank("ssccpo", withStimuli([ssccpoBank] as Parameters<typeof withStimuli>[0]));
