import { registerBank, withStimuli } from "../bank";
import ks2Bank from "@/data/v2/ks2/questions.json";

// Built by tools/ks2/build.py from tools/ks2/*.py: object form
// { stimuli, questions }, so each reading text is shared by its 8 questions.
registerBank("ks2", withStimuli([ks2Bank] as Parameters<typeof withStimuli>[0]));
