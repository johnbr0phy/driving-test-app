import { registerBank, withStimuli } from "../bank";
import shsatBank from "@/data/v2/shsat/questions.json";

// Built by tools/next100/shsat/build.py from tools/next100/shsat/*.py: object
// form { stimuli, questions } so each reading passage and Revising/Editing
// Part A text is shared by its five questions.
registerBank("shsat", withStimuli([shsatBank] as Parameters<typeof withStimuli>[0]));
