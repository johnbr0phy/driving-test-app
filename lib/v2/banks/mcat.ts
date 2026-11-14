import { registerBank, withStimuli } from "../bank";
import mcatBank from "@/data/v2/mcat/questions.json";

// Object form: the shared passages plus questions.
registerBank("mcat", withStimuli([mcatBank] as Parameters<typeof withStimuli>[0]));
