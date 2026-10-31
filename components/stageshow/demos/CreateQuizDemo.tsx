"use client";

// The /create hero: one phone, one continuous flow. A chat where someone has
// just sent their notes and asked for a quiz; the Tigertest tool runs, the
// answer streams in with the quiz link as a card, a tap on Play opens the
// card into the quiz itself, and the first answer lands green.
//
// Built with the Stageshow kit (components/stageshow/kit, from the skill in
// .claude/skills/stageshow). It plays once when scrolled into view; reduced
// motion and the first paint show the poster: the quiz open on its link with
// the right answer picked, so the still alone says "your notes became this".
//
// Real strings: the request, the file, the tool, the answer, the quiz card,
// the quiz URL, its question and options. Everything else is a bar.

import { ChevronLeft, FileText, Lock } from "lucide-react";
import { Bar, Check, Collapse, Expand, Phone, Stage, Stream, type Act, type Rect } from "@/components/stageshow/kit";
import "./create-quiz-demo.css";

const ASK = "Make a 20-question quiz";
const ANSWER = "Done. I wrote 20 questions on cell structure and saved them to your Tigertest account.";
const WORDS = ANSWER.split(" ").length;
const QUIZ = "Cell Biology: Chapter 4";
const LINK = "tigertest.io/q/K7RM2Q";
const QUESTION = "Which organelle makes most of the cell's ATP?";
const OPTIONS = ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"];
const RIGHT = 1;

type S = {
  tool: "idle" | "running" | "done";
  words: number;
  card: boolean;
  open: boolean;
  pick: number | null;
  // Where the card sits when Play is tapped, measured then, so the launch
  // grows from the card and not from where it was while sliding in
  from: Rect | null;
};

const initial: S = { tool: "idle", words: 0, card: false, open: false, pick: null, from: null };
const poster: S = { tool: "done", words: WORDS, card: true, open: true, pick: RIGHT, from: null };

// Where the finger rests between taps, in stage pixels: low on the screen,
// over empty thread, near the card it will tap
const REST = { wide: { x: 262, y: 440 }, compact: { x: 240, y: 420 } };

async function script(a: Act<S>) {
  await a.wait(900);
  a.mark("tool");
  a.put({ tool: "running" });
  await a.wait(1500);
  a.put({ tool: "done" });
  await a.wait(350);
  a.mark("stream");
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i });
    await a.wait(55);
  }
  await a.wait(250);
  a.mark("card");
  a.put({ card: true });
  await a.wait(1500);
  a.mark("play");
  await a.click("play");
  a.put({ from: a.rect("card") });
  a.put({ open: true });
  await a.wait(1500);
  a.mark("answer");
  await a.click(`opt-${RIGHT}`);
  a.put({ pick: RIGHT });
  await a.wait(600);
  await a.move(a.layout === "compact" ? REST.compact : REST.wide);
  await a.wait(2400);
}

function QuizCard({ playTarget }: { playTarget?: boolean }) {
  return (
    <div className="cq-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/tiger_face_03.png" alt="" className="cq-card__tiger" />
      <div className="cq-card__text">
        <div className="cq-card__title">{QUIZ}</div>
        <div className="cq-card__meta">20 questions · {LINK}</div>
      </div>
      <span className="cq-card__play" data-target={playTarget ? "play" : undefined}>
        Play
      </span>
    </div>
  );
}

function QuizScreen({ pick }: { pick: number | null }) {
  return (
    <div className="cq-quiz">
      <div className="cq-safari">
        <span className="cq-safari__done">Done</span>
        <span className="cq-safari__url">
          <Lock size={11} strokeWidth={2.5} aria-hidden />
          {LINK}
        </span>
      </div>
      <div className="cq-quiz__body">
        <div className="cq-quiz__head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tiger_face_03.png" alt="" className="cq-quiz__tiger" />
          <div className="cq-quiz__title">{QUIZ}</div>
        </div>
        <div className="cq-quiz__progress">
          <span>Question 1 of 20</span>
          <span className="cq-quiz__track">
            <span className="cq-quiz__fill" data-on={pick !== null || undefined} />
          </span>
        </div>
        <div className="cq-quiz__question">{QUESTION}</div>
        <div className="cq-quiz__options">
          {OPTIONS.map((o, i) => (
            <div
              key={o}
              className="cq-option"
              data-target={`opt-${i}`}
              data-right={(pick !== null && i === RIGHT) || undefined}
              data-dim={(pick !== null && i !== RIGHT) || undefined}
            >
              <span className="cq-option__letter">{String.fromCharCode(65 + i)}</span>
              <span className="cq-option__label">{o}</span>
              <Check on={pick !== null && i === RIGHT} size={20} className="cq-option__check" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CreateQuizDemo() {
  return (
    <Stage<S>
      width={400}
      height={500}
      compact={{ below: 400, width: 358, height: 470 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: REST, style: "touch" }}
      accent="#c2410c"
      className="cq"
    >
      {(s, rect, layout) => (
        <>
          <div className="cq-wash" />
          <Phone width={layout === "compact" ? 300 : 316} className="cq-phone" data-open={s.open || undefined}>
            <div className="cq-chat">
              <div className="cq-chat__head">
                <ChevronLeft size={24} strokeWidth={2} aria-hidden className="cq-chat__back" />
                <Bar w={92} h={10} r={5} tone={3} />
                <span className="cq-chat__back-spacer" />
              </div>
              <div className="cq-thread">
                {/* An earlier exchange, as filler: the new turn sits where
                    a real thread would put it, low on the screen */}
                <div className="cq-past">
                  <Bar w={168} h={40} r={20} tone={1} className="cq-past__me" />
                  <Bar w="92%" h={9} r={4} tone={2} />
                  <Bar w="78%" h={9} r={4} tone={2} />
                  <Bar w="54%" h={9} r={4} tone={2} />
                </div>
                <div className="cq-me">
                  <div className="cq-file">
                    <span className="cq-file__icon">
                      <FileText size={18} strokeWidth={2} aria-hidden />
                    </span>
                    <span className="cq-file__text">
                      <span className="cq-file__name">bio-chapter-4.pdf</span>
                      <span className="cq-file__meta">PDF</span>
                    </span>
                  </div>
                  <div className="cq-bubble">{ASK}</div>
                </div>

                <Collapse open={s.tool !== "idle"} reveal="drop">
                  <div className="cq-tool">
                    <Check on={s.tool === "done"} pending={s.tool === "running"} size={16} className="cq-tool__check" />
                    <span className="cq-tool__name">Tigertest</span>
                    <span className="cq-tool__fn">create quiz</span>
                  </div>
                </Collapse>

                <Collapse open={s.words > 0}>
                  <Stream className="cq-answer" text={ANSWER} count={s.words} />
                </Collapse>

                <Collapse open={s.card} reveal="drop">
                  <div data-target="card" className="cq-card-slot">
                    <QuizCard playTarget />
                  </div>
                </Collapse>
              </div>
            </div>

            {/* The card and the quiz are one element: the card grows into
                the page its link opens. Hidden until the launch, since a
                closed Expand still draws its face at the card */}
            <div className="cq-launch" data-on={s.open || undefined}>
              <Expand open={s.open} from={s.from ?? rect("card")} radius={18} duration={640} face={<QuizCard />}>
                <QuizScreen pick={s.pick} />
              </Expand>
            </div>
          </Phone>
        </>
      )}
    </Stage>
  );
}
