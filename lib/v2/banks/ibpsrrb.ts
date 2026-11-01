import { registerBank, withStimuli } from "../bank";
import ibpsrrbBank from "@/data/v2/ibpsrrb/questions.json";

// Object form: puzzle and data interpretation stimuli plus questions.
registerBank("ibpsrrb", withStimuli([ibpsrrbBank] as Parameters<typeof withStimuli>[0]));
