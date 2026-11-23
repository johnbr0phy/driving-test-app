import { registerBank, withStimuli } from "../bank";
import aemtBank from "@/data/v2/aemt/questions.json";

// Object form: Clinical Judgment scenarios plus questions.
registerBank("aemt", withStimuli([aemtBank] as Parameters<typeof withStimuli>[0]));
