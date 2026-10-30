import { registerBank, withStimuli } from "../bank";
import nswselBank from "@/data/v2/nswsel/questions.json";

// Built by tools/nswsel/build.py from tools/nswsel/*.json: object form
// { stimuli, questions } so each reading text is shared by its questions.
registerBank("nswsel", withStimuli([nswselBank] as Parameters<typeof withStimuli>[0]));
