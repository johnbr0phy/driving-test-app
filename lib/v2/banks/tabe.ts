import { registerBank, withStimuli } from "../bank";
import tabeBank from "@/data/v2/tabe/questions.json";

// Built by tools/next100/tabe/build.py from tools/next100/tabe/*.py: object
// form { stimuli, questions } so passages, drafts and tables are shared by
// three to five items.
registerBank("tabe", withStimuli([tabeBank] as Parameters<typeof withStimuli>[0]));
