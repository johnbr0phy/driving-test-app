import { registerBank, withStimuli } from "../bank";
import ndaBank from "@/data/v2/nda/questions.json";

// Object form: two reading passages plus questions.
registerBank("nda", withStimuli([ndaBank] as Parameters<typeof withStimuli>[0]));
