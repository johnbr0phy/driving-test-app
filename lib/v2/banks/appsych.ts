import { registerBank, withStimuli } from "../bank";
import appsychBank from "@/data/v2/appsych/questions.json";

// Object form: the shared study summaries and data tables plus questions.
registerBank("appsych", withStimuli([appsychBank] as Parameters<typeof withStimuli>[0]));
