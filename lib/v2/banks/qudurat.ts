import { registerBank, withStimuli } from "../bank";
import quduratBank from "@/data/v2/qudurat/questions.json";

// Object form: the original reading passages and data sets as stimuli, plus questions.
registerBank("qudurat", withStimuli([quduratBank] as Parameters<typeof withStimuli>[0]));
