import { registerBank, withStimuli } from "../bank";
import staareng1Bank from "@/data/v2/staareng1/questions.json";

// Object form: the original reading passages and student drafts as stimuli, plus questions.
registerBank("staareng1", withStimuli([staareng1Bank] as Parameters<typeof withStimuli>[0]));
