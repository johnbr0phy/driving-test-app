import { registerBank, withStimuli } from "../bank";
import ssatBank from "@/data/v2/ssat/questions.json";

// Built by tools/next100/ssat/build.py from tools/next100/ssat/*.py:
// object form { stimuli, questions } so each reading passage is shared by its questions.
registerBank("ssat", withStimuli([ssatBank] as Parameters<typeof withStimuli>[0]));
