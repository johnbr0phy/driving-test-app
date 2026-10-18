import { Question } from "@/types";
import realestatePaQuestions from "@/data/real-estate-pa-questions.json";
import realestateIlQuestions from "@/data/real-estate-il-questions.json";
import realestateOhQuestions from "@/data/real-estate-oh-questions.json";
import realestateGaQuestions from "@/data/real-estate-ga-questions.json";
import realestateNcQuestions from "@/data/real-estate-nc-questions.json";
import realestateMiQuestions from "@/data/real-estate-mi-questions.json";
import realestateVaQuestions from "@/data/real-estate-va-questions.json";
import realestateWaQuestions from "@/data/real-estate-wa-questions.json";
import realestateAzQuestions from "@/data/real-estate-az-questions.json";
import realestateTnQuestions from "@/data/real-estate-tn-questions.json";
import { registerExamBanks } from "@/lib/examData";

// State variant banks for the realestate family. Imported for its side effect by the
// app/<slug>/[state] pages only, so other exams never bundle these.
registerExamBanks({
  "realestate-pa": realestatePaQuestions as Question[],
  "realestate-il": realestateIlQuestions as Question[],
  "realestate-oh": realestateOhQuestions as Question[],
  "realestate-ga": realestateGaQuestions as Question[],
  "realestate-nc": realestateNcQuestions as Question[],
  "realestate-mi": realestateMiQuestions as Question[],
  "realestate-va": realestateVaQuestions as Question[],
  "realestate-wa": realestateWaQuestions as Question[],
  "realestate-az": realestateAzQuestions as Question[],
  "realestate-tn": realestateTnQuestions as Question[],
});
