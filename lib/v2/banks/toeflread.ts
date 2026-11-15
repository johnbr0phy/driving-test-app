import { registerBank, withStimuli } from "../bank";
import toeflreadBank from "@/data/v2/toeflread/questions.json";

// Object form: the original paragraphs, daily-life texts and passages as stimuli, plus questions.
registerBank("toeflread", withStimuli([toeflreadBank] as Parameters<typeof withStimuli>[0]));
