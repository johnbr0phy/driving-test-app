import { registerBank, withStimuli } from "../bank";
import cbestBank from "@/data/v2/cbest/questions.json";

// Built by tools/next100/cbest/build.py from tools/next100/cbest/*.py: object
// form { stimuli, questions } so passages, letters, tables and book excerpts
// are shared by two to six items.
registerBank("cbest", withStimuli([cbestBank] as Parameters<typeof withStimuli>[0]));
