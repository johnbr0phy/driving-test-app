import { registerBank, withStimuli } from "../bank";
import aisseeBank from "@/data/v2/aissee/questions.json";

// Object form: the Language section's reading passages plus questions.
registerBank("aissee", withStimuli([aisseeBank] as Parameters<typeof withStimuli>[0]));
