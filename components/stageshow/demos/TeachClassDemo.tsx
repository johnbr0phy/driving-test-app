"use client";

// The /teach hero: a device pair. The teacher's class page is the hero,
// pinned top-left and running off the bottom; a student's phone straddles its
// right edge over the page's quiet margin. A finger picks a wrong answer on
// the phone, and a beat later the class page shows it: the student's row
// says "Just now" and rolls their count, and the question they missed rolls
// its miss count. What the system does, cause on the phone, effect on the page.
//
// Built with the Stageshow kit (components/stageshow/kit). Plays once in
// view; the poster is the synced page with the miss on the phone.
//
// Real strings: the class, the students (three rows), the missed questions'
// stems and counts, the banner, the question and options on the phone.

import { useTeachCopy } from "@/components/teach/useTeachCopy";
import { X } from "lucide-react";
import { Bar, Check, Count, Phone, Stage, Window, type Act } from "@/components/stageshow/kit";
import "./teach-class-demo.css";

// The question on the phone is the landing's first sample question (teachCopy).
const RIGHT = 1;
const PICK = 0;

type S = { pick: number | null; synced: boolean; missed: boolean };

const initial: S = { pick: null, synced: false, missed: false };
const poster: S = { pick: PICK, synced: true, missed: true };

const REST = { wide: { x: 760, y: 420 }, compact: { x: 70, y: 470 } };

async function script(a: Act<S>) {
  await a.wait(1200);
  a.mark("tap");
  await a.click(`opt-${PICK}`);
  a.put({ pick: PICK });
  await a.wait(500);
  await a.move(a.layout === "compact" ? REST.compact : REST.wide);
  await a.wait(500);
  a.mark("sync");
  a.put({ synced: true });
  await a.wait(450);
  a.put({ missed: true });
  await a.wait(3000);
}

const STUDENTS = [
  { name: "Maya B.", days: 1, answered: 288 },
  { name: "Barney B.", days: 3, answered: 150 },
];

function ClassPage({ s }: { s: S }) {
  const c = useTeachCopy();
  return (
    <div className="tc-page">
      <div className="tc-head">
        <div className="tc-title">{c.demoClassName}</div>
        <div className="tc-sub">{c.demoClassSub}</div>
      </div>

      <section className="tc-card">
        <div className="tc-card__title">{c.studentsTitle}</div>
        <div className="tc-row tc-row--student" data-flash={s.synced || undefined}>
          <span className="tc-name">Phoebe B.</span>
          <span className="tc-when">
            <span className="tc-when__swap" data-on={s.synced || undefined}>
              <span>{c.today}</span>
              <span className="tc-live">
                <span className="tc-live__dot" />
                {c.justNow}
              </span>
            </span>
          </span>
          <span className="tc-num">
            <Count value={s.synced ? 413 : 412} /> {c.answeredWord}
          </span>
          <Bar w={52} h={8} r={4} tone={2} className="tc-fill" />
        </div>
        {STUDENTS.map((st) => (
          <div key={st.name} className="tc-row tc-row--student">
            <span className="tc-name">{st.name}</span>
            <span className="tc-when">{st.days === 1 ? c.yesterday : c.daysAgo(st.days)}</span>
            <span className="tc-num">{st.answered} {c.answeredWord}</span>
            <Bar w={44} h={8} r={4} tone={2} className="tc-fill" />
          </div>
        ))}
      </section>

      <section className="tc-card">
        <div className="tc-card__title">{c.demoMostMissed}</div>
        <div className="tc-row tc-row--q" data-flash={s.missed || undefined}>
          <span className="tc-q">{c.demoMissedQ}</span>
          <span className="tc-missed">
            <Count value={s.missed ? 10 : 9} />
            <span>{c.of}</span>
            <Count value={s.missed ? 17 : 16} />
            <span>{c.missedWord}</span>
          </span>
        </div>
        <div className="tc-row tc-row--q">
          <span className="tc-q">{c.sampleQuestions[1].question}</span>
          <span className="tc-missed">6 {c.of} 17 {c.missedWord}</span>
        </div>
        <div className="tc-row tc-row--q tc-row--filler">
          <Bar w={210} h={8} r={4} tone={2} />
          <Bar w={70} h={8} r={4} tone={1} />
        </div>
      </section>
    </div>
  );
}

// The phone column's design: the student's phone leads, and the class page
// is a small card straddling its edge with only the two rows that change
function ClassMini({ s }: { s: S }) {
  const c = useTeachCopy();
  return (
    <Window url="tigertest.io/teach" chrome="hairline" className="tc-mini">
      <div className="tc-mini__body">
        <div className="tc-mini__title">{c.demoClassName}</div>
        <div className="tc-mini__row" data-flash={s.synced || undefined}>
          <span className="tc-name">Phoebe B.</span>
          <span className="tc-when__swap" data-on={s.synced || undefined}>
            <span className="tc-when">{c.today}</span>
            <span className="tc-live">
              <span className="tc-live__dot" />
              {c.justNow}
            </span>
          </span>
          <span className="tc-num tc-mini__num">
            <Count value={s.synced ? 413 : 412} />
          </span>
        </div>
        <div className="tc-mini__row tc-mini__row--q" data-flash={s.missed || undefined}>
          <span className="tc-q">{c.demoMissedShort}</span>
          <span className="tc-missed">
            <Count value={s.missed ? 10 : 9} />
            <span>{c.of}</span>
            <Count value={s.missed ? 17 : 16} />
            <span>{c.missedWord}</span>
          </span>
        </div>
      </div>
    </Window>
  );
}

function StudentScreen({ pick }: { pick: number | null }) {
  const c = useTeachCopy();
  const sample = c.sampleQuestions[0];
  const options = sample.options;
  const answered = pick !== null;
  return (
    <div className="tc-phone-screen">
      <div className="tc-url">tigertest.io/cst/practice/2</div>
      <div className="tc-banner">
        {c.sharedWith} <b>{c.teacherPlaceholder}</b>{c.sharedWithAfter}
      </div>
      <div className="tc-quiz">
        <div className="tc-quiz__meta">
          <span>{c.demoTrainingSet}</span>
          <span>{c.demoProgress}</span>
        </div>
        <span className="tc-quiz__track">
          <span className="tc-quiz__fill" />
        </span>
        <div className="tc-quiz__question">{sample.question}</div>
        <div className="tc-quiz__options">
          {options.map((o, i) => (
            <div
              key={o}
              className="tc-option"
              data-target={`opt-${i}`}
              data-wrong={(answered && i === pick && i !== RIGHT) || undefined}
              data-right={(answered && i === RIGHT) || undefined}
              data-dim={(answered && i !== RIGHT && i !== pick) || undefined}
            >
              <span className="tc-option__label">{o}</span>
              <span className="tc-option__mark">
                {answered && i === pick && i !== RIGHT ? (
                  <span className="tc-option__x">
                    <X size={12} strokeWidth={3} aria-hidden />
                  </span>
                ) : (
                  <Check on={answered && i === RIGHT} size={20} className="tc-option__check" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeachClassDemo() {
  return (
    <Stage<S>
      width={880}
      height={470}
      compact={{ below: 640, width: 358, height: 500 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: REST, style: "touch" }}
      accent="#c2410c"
      className="tc"
    >
      {(s, _rect, layout) =>
        layout === "compact" ? (
          <>
            <Phone width={280} className="tc-phone">
              <StudentScreen pick={s.pick} />
            </Phone>
            <ClassMini s={s} />
          </>
        ) : (
          <>
            <Window url="tigertest.io/teach/classes/K7QF2" className="tc-window">
              <ClassPage s={s} />
            </Window>
            <Phone width={300} className="tc-phone">
              <StudentScreen pick={s.pick} />
            </Phone>
          </>
        )
      }
    </Stage>
  );
}
