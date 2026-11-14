import { registerBank, withStimuli } from "../bank";
import ieltsreadBank from "@/data/v2/ieltsread/questions.json";

// Object form: the original reading passages as stimuli, plus questions.
registerBank("ieltsread", withStimuli([ieltsreadBank] as Parameters<typeof withStimuli>[0]));
