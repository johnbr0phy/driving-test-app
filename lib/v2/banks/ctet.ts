import { registerBank, withStimuli } from "../bank";
import ctetBank from "@/data/v2/ctet/questions.json";

// Object form: the five Language I reading passages and poems plus questions.
registerBank("ctet", withStimuli([ctetBank] as Parameters<typeof withStimuli>[0]));
