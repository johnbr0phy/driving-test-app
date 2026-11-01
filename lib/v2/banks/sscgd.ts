import { registerBank, withStimuli } from "../bank";
import sscgdBank from "@/data/v2/sscgd/questions.json";

// Object form: the two cloze passages and two reading passages plus questions.
registerBank("sscgd", withStimuli([sscgdBank] as Parameters<typeof withStimuli>[0]));
