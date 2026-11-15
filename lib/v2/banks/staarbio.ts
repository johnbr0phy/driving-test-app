import { registerBank, withStimuli } from "../bank";
import staarbioBank from "@/data/v2/staarbio/questions.json";

// Object form: the cluster scenarios and data tables plus questions.
registerBank("staarbio", withStimuli([staarbioBank] as Parameters<typeof withStimuli>[0]));
