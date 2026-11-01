import { registerBank, withStimuli } from "../bank";
import apbioBank from "@/data/v2/apbio/questions.json";

// Object form: the shared experiments and data tables plus questions.
registerBank("apbio", withStimuli([apbioBank] as Parameters<typeof withStimuli>[0]));
