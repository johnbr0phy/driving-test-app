import { registerBank, withStimuli } from "../bank";
import jambengBank from "@/data/v2/jambeng/questions.json";

// Object form: original comprehension and cloze passages plus questions.
registerBank("jambeng", withStimuli([jambengBank] as Parameters<typeof withStimuli>[0]));
