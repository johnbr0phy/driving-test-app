import { registerBank, withStimuli } from "../bank";
import gedBank from "@/data/v2/ged/questions.json";

// Built by tools/build_v2_bank.py ged from tools/ged/*.json: object form
// { stimuli, questions } so reading passages, science stimuli and social
// studies excerpts can be shared by two or three items.
registerBank("ged", withStimuli([gedBank] as Parameters<typeof withStimuli>[0]));
