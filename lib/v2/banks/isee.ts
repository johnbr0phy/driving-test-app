import { registerBank, withStimuli } from "../bank";
import iseeBank from "@/data/v2/isee/questions.json";

// Built by tools/next100/isee/build.py from tools/next100/isee/*.py:
// object form { stimuli, questions } so each reading passage is shared by its questions.
registerBank("isee", withStimuli([iseeBank] as Parameters<typeof withStimuli>[0]));
