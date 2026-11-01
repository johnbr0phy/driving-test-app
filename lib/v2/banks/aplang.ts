import { registerBank, withStimuli } from "../bank";
import aplangBank from "@/data/v2/aplang/questions.json";

// Object form: the shared passages and student drafts plus questions.
registerBank("aplang", withStimuli([aplangBank] as Parameters<typeof withStimuli>[0]));
