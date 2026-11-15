import { registerBank, withStimuli } from "../bank";
import datBank from "@/data/v2/dat/questions.json";

// Object form: the shared reading passages plus questions.
registerBank("dat", withStimuli([datBank] as Parameters<typeof withStimuli>[0]));
