import { registerBank, withStimuli } from "../bank";
import vicselBank from "@/data/v2/vicsel/questions.json";

// Built by tools/vicsel/build.py from tools/vicsel/*.py: object form
// { stimuli, questions } so each reading text is shared by its questions.
registerBank("vicsel", withStimuli([vicselBank] as Parameters<typeof withStimuli>[0]));
