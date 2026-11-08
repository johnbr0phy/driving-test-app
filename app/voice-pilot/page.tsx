import { notFound } from 'next/navigation';
import { VoiceTutor } from '@/components/voice-tutor/VoiceTutor';
import questions from '@/data/questions.json';
export const metadata = { title: 'Voice tutor pilot | Tigertest', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default function VoicePilotPage() {
  if (process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV !== 'development' && process.env.VOICE_TUTOR_PILOT !== 'true') notFound();
  const question = questions.find(q => q.questionId === 'U-001')!;
  return <main className="mx-auto max-w-2xl p-6 space-y-6">
    <h1 className="text-2xl font-bold">Talk to the tiger</h1>
    <p>This is an early voice tutor preview. Live conversation requires a connected voice server. AI answers can be wrong; use the written explanation as your reference.</p>
    <section className="rounded-xl border p-5 space-y-3">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      {[question.optionA, question.optionB, question.optionC, question.optionD].map((option, i) => <p key={i}>{'ABCD'[i]}. {option}</p>)}
      <p><strong>Answer: {question.correctAnswer}.</strong> {question.explanation}</p>
    </section>
    <VoiceTutor examId="dmv" questionId={question.questionId} optionOrder="ABCD" questionText={question.question} language="en" />
  </main>;
}
