import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AchievementCelebration } from "../../components/AchievementCelebration";
import { Fireworks } from "../../components/Fireworks";
import { queueAchievementCelebration, takeAchievementCelebration } from "../../lib/achievementCelebration";

const mode = new URLSearchParams(location.search).get("mode") ?? "saved";
function Fixture() {
  const [tick, setTick] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [show, setShow] = useState(mode === "fireworks");
  const [claimed, setClaimed] = useState<string>("");
  useEffect(() => {
    if (mode !== "fireworks") return;
    const timer = setInterval(() => setTick(n => n + 1), 80);
    return () => clearInterval(timer);
  }, []);
  return <main className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950">
    {show && <Fireworks duration={650} onComplete={() => { setCompleted(n => n + 1); setShow(false); }} />}
    <AchievementCelebration examId="timestables" eyebrow="Basics complete" title="All your basics are green!" description="You learned all 4 skills in 2s, 5s and 10s. Your practice questions are next." detail="4 of 4 basics skills learned · 2s, 5s and 10s" earned={mode === "earned"} headingLevel={1}>
      <a href="#progress" className="flex min-h-12 items-center justify-center rounded-xl bg-brand px-4 text-base font-bold text-white">See your progress</a>
      <button className="min-h-12 rounded-xl border-2 border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50">Try the practice questions</button>
    </AchievementCelebration>
    <button onClick={() => setTick(n => n + 1)}>Rerender</button>
    <button onClick={() => { queueAchievementCelebration("fixture-result"); setClaimed("queued"); }}>Queue completion</button>
    <button onClick={() => setClaimed(String(takeAchievementCelebration("fixture-result")))}>Claim completion</button>
    <output aria-label="Renders">{tick}</output>
    <output aria-label="Fireworks completed">{completed}</output>
    <output aria-label="Completion claimed">{claimed}</output>
  </main>;
}
createRoot(document.getElementById("root")!).render(<React.StrictMode><Fixture /></React.StrictMode>);
