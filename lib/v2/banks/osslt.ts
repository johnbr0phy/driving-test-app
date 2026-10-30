import { registerBank, withStimuli } from "../bank";
import ossltBank from "@/data/v2/osslt/questions.json";

// Built by tools/osslt/build.py from tools/osslt/{reading,writing}.py: object
// form { stimuli, questions } so each reading selection is shared by its items.
registerBank("osslt", withStimuli([ossltBank] as Parameters<typeof withStimuli>[0]));
