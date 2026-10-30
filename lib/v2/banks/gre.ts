import { registerBank, withStimuli } from "../bank";
import greBank from "@/data/v2/gre/questions.json";

// Object form: the shared reading passages plus questions.
registerBank("gre", withStimuli([greBank] as Parameters<typeof withStimuli>[0]));
