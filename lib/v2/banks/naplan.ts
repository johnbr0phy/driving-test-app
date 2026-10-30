import { registerBank, withStimuli } from "../bank";
import naplanBank from "@/data/v2/naplan/questions.json";

// Built by tools/naplan/build.py from tools/naplan/*.py: object form
// { stimuli, questions } so each reading text is shared by its five items.
registerBank("naplan", withStimuli([naplanBank] as Parameters<typeof withStimuli>[0]));
