import { registerBank, withStimuli } from "../bank";
import jnvstBank from "@/data/v2/jnvst/questions.json";

// Object form: the EVS and Language Test passages plus questions.
registerBank("jnvst", withStimuli([jnvstBank] as Parameters<typeof withStimuli>[0]));
