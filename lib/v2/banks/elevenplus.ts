import { registerBank, withStimuli } from "../bank";
import bank from "@/data/v2/elevenplus/questions.json";

// Built by tools/elevenplus/build.py from tools/elevenplus/q_*.py: object form
// { stimuli, questions } so each comprehension passage is shared by its six
// questions.
registerBank("elevenplus", withStimuli([bank] as Parameters<typeof withStimuli>[0]));
