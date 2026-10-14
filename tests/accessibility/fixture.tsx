import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { TrainingCard } from '../../components/TrainingCard';
import { QuestionCard } from '../../components/QuestionCard';
import { QuestionView } from '../../components/v2/QuestionView';
import { Figure } from '../../components/v2/Figure';
import { Calculator } from '../../components/v2/Calculator';
import { Timer } from '../../components/v2/Timer';
import { QuizRow } from '../../components/QuizRow';
import { PaywallModal } from '../../components/PaywallModal';
import { QuestionV2, AnswerValue } from '../../lib/v2/types';
import { Question } from '../../types';
const mode = new URLSearchParams(location.search).get('mode') || 'training';
const dmv = { questionId: 'fixture', question: 'Which choice is safe?', optionA: 'First choice', optionB: 'Second choice', optionC: 'Third choice', optionD: 'Fourth choice', correctAnswer: 'B', explanation: 'Use the second choice.' } as Question;
const base = { id: 'fixture', section: 'example', domain: 'example', module: 1, test: 1, difficulty: 1, format: 'single', stem: 'Choose an answer.', options: ['First choice', 'Second choice', 'Third choice'], correct: [1], explanation: 'Use the second choice.' } as QuestionV2;
const questions: Record<string, QuestionV2> = {
    single: base, multi: { ...base, format: 'multi', select: 2, correct: [0, 1] },
    numeric: { ...base, format: 'numeric', stem: 'Evaluate $2+2$.', numeric: { answers: ['4'], tolerance: 0 } },
    order: { ...base, format: 'order', correct: [1, 0, 2] },
    matrix: { ...base, format: 'matrix', rows: ['First row', 'Second row'], columns: ['Yes', 'No'], correct: [0, 1] },
    bowtie: { ...base, format: 'bowtie', groups: [{ label: 'Actions', pick: 1, options: ['Action one', 'Action two'] }, { label: 'Condition', pick: 1, options: ['Condition one', 'Condition two'] }, { label: 'Monitoring', pick: 1, options: ['Monitor one', 'Monitor two'] }], correct: [0, 2, 4] },
    highlight: { ...base, format: 'highlight', stem: 'Select {{first phrase}} or {{second phrase}}.', correct: [1] },
    cloze: { ...base, format: 'cloze', stem: 'Choose [[1]] and [[2]].', blanks: [['First', 'Second'], ['Third', 'Fourth']], correct: [1, 0] },
};
function Fixture() {
    const [answer, setAnswer] = useState<AnswerValue>();
    const [reveal, setReveal] = useState(false);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [expires, setExpires] = useState(0);
    const select = (value: AnswerValue) => { setAnswer(value); setCount(n => n + 1); };
    return <LanguageProvider><main><h1>Accessibility fixture</h1>
 {mode === 'training' && <TrainingCard question={dmv} selectedAnswer={typeof answer === 'string' ? answer : null} onAnswerSelect={select} onNext={() => { setAnswer(undefined); setCount(0); }}/>}
 {mode === 'test' && <QuestionCard question={dmv} selectedAnswer={typeof answer === 'string' ? answer : undefined} onAnswerChange={select} showResult={reveal}/>}
 {questions[mode] && <><QuestionView question={questions[mode]} stimulus={{ id: 'passage', title: 'Reference', text: 'Read this reference.' }} optionOrder={[0, 1, 2]} answer={answer} onAnswer={select} reveal={reveal} disabled={reveal}/><button onClick={() => setReveal(true)}>Check</button></>}
 {mode === 'figure' && <Figure figure={{ src: '/signs/warning-diamond.svg', alt: 'Yellow diamond with a black border.' }}/>}
 {mode === 'contrast' && <><button className="text-gray-400 hover:text-gray-700">Light surface action</button><div className="contrast-dark-surface bg-gradient-to-b from-gray-950 to-green-950 p-4"><button className="text-gray-400 hover:text-white">Dark surface action</button><p className="text-gray-500">Training complete</p></div></>}
 {mode === 'calculator' && <Calculator />}
 {mode === 'quiz' && <QuizRow chipValue="10" chipLabel="misses" question={dmv.question} options={['First choice', 'Second choice']} correctAnswer="Second choice"/>}
 {mode === 'paywall' && <><button onClick={() => setOpen(true)}>Open premium</button><PaywallModal open={open} onOpenChange={setOpen} feature="fixture" onUpgrade={async () => { }} isGuest onSignUp={() => { }}/></>}
 {mode === 'timer' && <><Timer remaining={() => 0} onExpire={() => setExpires(n => n + 1)}/><output aria-label="Expirations">{expires}</output></>}
 <output aria-label="Selections">{count}</output><output aria-label="Answer">{JSON.stringify(answer)}</output>
 <button>After fixture</button>
 </main></LanguageProvider>;
}
createRoot(document.getElementById('root')!).render(<Fixture />);
