import { registerBank, withStimuli } from "../bank";
import iegardaBank from "@/data/v2/iegarda/questions.json";

// Object form: the original passages and tables as stimuli, plus questions.
registerBank("iegarda", withStimuli([iegardaBank] as Parameters<typeof withStimuli>[0]));
