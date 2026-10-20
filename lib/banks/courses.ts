import { registerExamBanks } from "@/lib/examData";

// Teachers' hand-built course banks (docs/COURSE_REQUESTS.md). Imported for
// its side effect by the app/course/[course] pages only, so no public exam
// bundles them. Add each course as `"course-<key>": <bank> as Question[]`.
registerExamBanks({});
