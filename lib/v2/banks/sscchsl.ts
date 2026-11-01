import { registerBank, withStimuli } from "../bank";
import sscchslBank from "@/data/v2/sscchsl/questions.json";

// Object form: the two cloze passages and two reading passages plus questions.
registerBank("sscchsl", withStimuli([sscchslBank] as Parameters<typeof withStimuli>[0]));
