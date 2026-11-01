import { registerBank, withStimuli } from "../bank";
import agniveervayuBank from "@/data/v2/agniveervayu/questions.json";

// Object form: three reading passages plus questions.
registerBank("agniveervayu", withStimuli([agniveervayuBank] as Parameters<typeof withStimuli>[0]));
