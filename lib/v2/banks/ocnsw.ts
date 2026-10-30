import { registerBank, withStimuli } from "../bank";
import ocnswBank from "@/data/v2/ocnsw/questions.json";

// Built by tools/ocnsw/build.py from tools/ocnsw/*.json: object form
// { stimuli, questions } so each reading text is shared by its questions.
registerBank("ocnsw", withStimuli([ocnswBank] as Parameters<typeof withStimuli>[0]));
