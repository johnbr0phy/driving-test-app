import { registerBank, withStimuli } from "../bank";
import naplan7Bank from "@/data/v2/naplan7/questions.json";

// Built by tools/naplan7/build.py from tools/naplan7/*.py: object form
// { stimuli, questions } so each reading text is shared by its five items.
registerBank("naplan7", withStimuli([naplan7Bank] as Parameters<typeof withStimuli>[0]));
