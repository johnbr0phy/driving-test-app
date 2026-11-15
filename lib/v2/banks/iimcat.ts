import { registerBank, withStimuli } from "../bank";
import iimcatBank from "@/data/v2/iimcat/questions.json";

// Object form: reading passages and DILR sets as stimuli plus questions.
registerBank("iimcat", withStimuli([iimcatBank] as Parameters<typeof withStimuli>[0]));
