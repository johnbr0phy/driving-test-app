import { registerBank, withStimuli } from "../bank";
import gmatBank from "@/data/v2/gmat/questions.json";

// Object form: reading passages and multi-source sets as stimuli, plus questions.
registerBank("gmat", withStimuli([gmatBank] as Parameters<typeof withStimuli>[0]));
