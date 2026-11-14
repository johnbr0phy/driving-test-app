import { registerBank, withStimuli } from "../bank";
import hisetBank from "@/data/v2/hiset/questions.json";

// Built by tools/next100/hiset/build.py from tools/next100/hiset/*.py: object
// form { stimuli, questions } so passages, drafts, investigations and
// documents are shared by two to four items.
registerBank("hiset", withStimuli([hisetBank] as Parameters<typeof withStimuli>[0]));
