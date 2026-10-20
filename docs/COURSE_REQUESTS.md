# Course requests: building a teacher's course by hand

A teacher whose test isn't on TigerTest fills in `/teach/course` (course name,
level, topics, optional syllabus and date). That writes `courseRequests/{id}`
and emails John. Nothing is generated automatically yet: each course is built
by hand, here, then moved along from the **Course requests** card on the
/admin Teachers tab.

## 1. Mark it Building

Open /admin?tab=teachers, expand the request, click **Building**. The teacher's
/teach page already shows it as Building; this just records that you started.
Reply to the notification email if a topic is unclear (Reply-To is the teacher).

## 2. Write the bank

Use the `exam-bank` skill for the writing and quality rules, with these
differences from a public exam:

- **File:** `data/courses/<key>.json`, where `<key>` is short, lowercase,
  unguessable enough not to collide: `apbio-rivera`, `nurs101-lakeview`.
- **Ids:** prefix `C<KEY>-` in caps without dashes (`CAPBIORIVERA-CEL-001`),
  category keys camelCase and prefixed with the course key so they never
  collide with another exam's (`apbioCells`).
- **Size:** about 40 to 50 questions per topic (fewer topics, more each).
  Every training set needs at least its `size` questions, and every
  `blueprint` count times `testCount` must fit inside that topic's pool.
- **Source:** the teacher's topics and pasted materials. Write original
  questions; never copy a textbook's or publisher's items.

## 3. Register the course

1. `lib/exams.ts`: add the id `"course-<key>"` to the `ExamId` union, then a
   config next to `COURSES` and list it in `COURSES`:

   ```ts
   const courseApbioRivera: ExamConfig = {
     id: "course-apbio-rivera",
     course: { requestId: "<courseRequests doc id>" },
     stateCode: "COURSE_APBIO_RIVERA",
     idBase: 9000,            // next free block of 50 from 9000 (9000, 9050, 9100...)
     slug: "/course/apbio-rivera",
     name: "AP Biology",      // the teacher's course name
     shortName: "AP Bio",
     examLabel: "Ms. Rivera · Lakeview High School",
     fullName: "AP Biology course",
     questionIdPrefix: "CAPBIORIVERA-",
     icon: "book",
     testCount: 4,
     questionsPerTest: 40,
     passPct: 70,
     blueprint: { apbioCells: 8, ... },          // per test, sums to questionsPerTest
     trainingSets: [{ setNumber: 1, id: 9001, name: "Cell Structure", categories: ["apbioCells"], size: 45, weightLabel: "1 of 5 units" }, ...],
     categoryLabels: { apbioCells: "Cell Structure", ... },
     copy: { ... },           // like any exam; sourceLine: "Built for Ms. Rivera's AP Biology class."
   };
   ```

   Sets use `idBase + 1..`, tests `idBase + 1..testCount`; keep both inside
   the 50-id block.
2. `lib/banks/courses.ts`: import the JSON and add
   `"course-<key>": bank as Question[]` to `registerExamBanks`.
3. Run `npx tsx scripts/build-training-parts.ts` (a topic over 60 questions
   is split into parts and needs `partNames`), `npx tsc --noEmit`,
   `npm run lint`.

Nothing else: the pages come from `app/course/[course]/`, the indigo theme
from `[data-theme^="course-"]` in `app/globals.css`, and the course stays out
of the catalog, sitemap, landings, emails and answer analytics because it is
not in `EXAMS`. The pages are `noindex, nofollow`.

## 4. Deploy, preview, send

1. Ship it, open `tigertest.io/course/<key>/dashboard` and try a set and a test.
2. On /admin, pick the course in the request's dropdown, click **Send
   preview**: the teacher gets the dashboard link and is asked to reply with
   fixes. Fix answer keys in the bank and redeploy.
3. When they're happy, click **Make class & send**: it creates their class
   (named after the course, their name and school from the form, owned by
   their account) and emails them `tigertest.io/c/<code>` plus their class page.
   Clicking it again resends the same class, never a second one.

**Decline** marks a request that won't be built (no email: reply yourself).
