import { registerBank, withStimuli } from "../bank";
import ugcnetBank from "@/data/v2/ugcnet/questions.json";

// Object form: the reading comprehension passages and data interpretation tables plus questions.
registerBank("ugcnet", withStimuli([ugcnetBank] as Parameters<typeof withStimuli>[0]));
