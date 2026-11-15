import { registerBank, withStimuli } from "../bank";
import hsptBank from "@/data/v2/hspt/questions.json";

// Built by tools/next100/hspt/build.py from tools/next100/hspt/*.py:
// object form { stimuli, questions } so each reading passage is shared by its questions.
registerBank("hspt", withStimuli([hsptBank] as Parameters<typeof withStimuli>[0]));
