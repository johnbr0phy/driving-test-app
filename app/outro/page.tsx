"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { Fireworks } from "@/components/Fireworks";
import { TrainingCard } from "@/components/TrainingCard";
import { useTranslation } from "@/contexts/LanguageContext";
import { Question } from "@/types";
import { shuffleQuestionOptions } from "@/lib/testGenerator";

const outroQuestions: Question[] = [
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-1",
    category: "general",
    question: "You just mastered 200 practice questions. What's the technical term for that?",
    optionA: "Overachiever",
    optionB: "Road scholar",
    optionC: "DMV's worst nightmare",
    optionD: "All of the above",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "All of the above, obviously. You're a certified road scholar and the DMV should be nervous.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-2",
    category: "general",
    question: "What should you do the night before your DMV test?",
    optionA: "Cram for 12 hours straight",
    optionB: "Get a good night's sleep — you already studied",
    optionC: "Panic and question all your life choices",
    optionD: "Build a time machine to skip to the results",
    correctAnswer: "B",
    correctIndex: 1,
    explanation: "You've already put in the work. Sleep well and trust your preparation!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-3",
    category: "general",
    question: "When you pass your driving test, what's the correct celebration?",
    optionA: "A subtle fist pump",
    optionB: "Tell literally everyone you know",
    optionC: "Update your social media bio to 'Licensed Driver'",
    optionD: "All celebrations are valid",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "You earned it. Celebrate however feels right — you put in serious effort to get here!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-4",
    category: "general",
    question: "How many questions did you practice across all training sets?",
    optionA: "50",
    optionB: "100",
    optionC: "150",
    optionD: "200",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "200 questions across 4 training sets! That's dedication that pays off at the DMV.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-5",
    category: "general",
    question: "What's the most important thing to bring to the DMV on test day?",
    optionA: "Your lucky socks",
    optionB: "Required ID and documents",
    optionC: "A four-leaf clover",
    optionD: "Snacks for the wait",
    correctAnswer: "B",
    correctIndex: 1,
    explanation: "Bring your valid ID and any required documents. The lucky socks are optional but encouraged.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-6",
    category: "general",
    question: "After passing, what will your friends ask you for?",
    optionA: "Rides. Lots of rides.",
    optionB: "Driving tips",
    optionC: "To borrow your car",
    optionD: "All of the above, immediately",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "Congratulations — you're about to become everyone's favorite taxi service.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-7",
    category: "general",
    question: "You scored 80%+ on all 4 practice tests. That makes you…",
    optionA: "Statistically very likely to pass the real test",
    optionB: "More prepared than most people at the DMV",
    optionC: "Someone who takes things seriously",
    optionD: "All of the above",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "Studies show that students who consistently score 80%+ on practice tests have a very high pass rate. You're ready!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-8",
    category: "general",
    question: "What's the biggest mistake people make at the DMV?",
    optionA: "Not studying at all",
    optionB: "Only studying the night before",
    optionC: "Overthinking easy questions",
    optionD: "Showing up without the right documents",
    correctAnswer: "A",
    correctIndex: 0,
    explanation: "The #1 reason people fail is not studying enough. That's clearly NOT your problem!",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-9",
    category: "general",
    question: "Quick — what does a red octagonal sign mean?",
    optionA: "Speed up",
    optionB: "Stop",
    optionC: "Yield",
    optionD: "You should know this by now!",
    correctAnswer: "B",
    correctIndex: 1,
    explanation: "Stop! You knew that instantly. See? All that practice is locked in your brain.",
  },
  {
    type: "Universal",
    state: "ALL",
    questionId: "outro-10",
    category: "general",
    question: "Final question: Are you ready to pass your driving test?",
    optionA: "Absolutely, let's do this!",
    optionB: "Born ready",
    optionC: "The DMV is not ready for ME",
    optionD: "All of the above — let's go!",
    correctAnswer: "D",
    correctIndex: 3,
    explanation: "That's the spirit! You've completed every training set, passed every practice test, and now you're finishing the victory lap. Go ace that test!",
  },
];

// The final question (outro-10) is always last — wrong answers get re-asked before it
const FINAL_QUESTION = outroQuestions[outroQuestions.length - 1];
const MAIN_QUESTIONS = outroQuestions.slice(0, -1);

function OutroContent() {
  const router = useRouter();
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const { t } = useTranslation();

  const selectedState = useStore((s) => s.selectedState);
  const outroComplete = useStore((s) => s.outroComplete);
  const completeOutro = useStore((s) => s.completeOutro);

  // Build the question queue: main questions in order, wrong answers re-queued before the final question
  const [questionQueue, setQuestionQueue] = useState<Question[]>(() => [...MAIN_QUESTIONS]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAsked, setTotalAsked] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [replayMode, setReplayMode] = useState(false);
  const wrongQueueRef = useRef<Question[]>([]);

  useEffect(() => {
    if (hydrated && !selectedState) {
      router.push("/onboarding/select-state");
    }
  }, [hydrated, selectedState, router]);

  // If already complete, start in replay mode (re-answering all questions)
  useEffect(() => {
    if (hydrated && outroComplete) {
      setReplayMode(true);
    }
  }, [hydrated, outroComplete]);

  if (!hydrated || !selectedState) {
    return <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to" />;
  }

  const currentQuestion = questionQueue[currentIndex];
  // We're done with main + retries when currentIndex is past the queue
  const mainQueueDone = currentIndex >= questionQueue.length;

  // Show the final question after all main + retries are done
  const showingFinalQuestion = mainQueueDone;
  const displayQuestion = showingFinalQuestion ? FINAL_QUESTION : currentQuestion;

  // Total questions = original 9 main + however many retries + 1 final
  const progressTotal = questionQueue.length + 1;
  const progressCurrent = showingFinalQuestion ? progressTotal : currentIndex + 1;

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer || !displayQuestion) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === displayQuestion.correctAnswer;

    if (isCorrect) {
      playCorrectSound();
      setCorrectCount((c) => c + 1);
    } else {
      playIncorrectSound();
      // If this is a main question (not the final), queue it for retry with shuffled options
      if (!showingFinalQuestion) {
        wrongQueueRef.current.push(displayQuestion);
      }
    }
    setTotalAsked((t) => t + 1);
  };

  const handleNext = () => {
    setSelectedAnswer(null);

    if (showingFinalQuestion) {
      // All done — complete outro and redirect to dashboard with fireworks
      if (!outroComplete) {
        completeOutro();
      }
      setShowFireworks(true);
      return;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= questionQueue.length) {
      // We've gone through the main queue — append any wrong answers (shuffled) before final
      if (wrongQueueRef.current.length > 0) {
        const retries = wrongQueueRef.current.map((q) => shuffleQuestionOptions(q));
        wrongQueueRef.current = [];
        setQuestionQueue((prev) => [...prev, ...retries]);
      }
      // Move index forward (will trigger showingFinalQuestion or show retries)
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleFireworksComplete = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to">
      {showFireworks && (
        <Fireworks duration={3000} onComplete={handleFireworksComplete} />
      )}

      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Header — matches training page */}
        <div className="mb-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.back")}
            </Button>
          </Link>
        </div>

        {/* Question Card */}
        {displayQuestion && (
          <TrainingCard
            key={`${displayQuestion.questionId}-${currentIndex}`}
            question={displayQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
          />
        )}

        {/* Progress */}
        <div className="mt-4 md:mt-6 text-center">
          <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700">
            <span className="font-bold text-xl md:text-2xl text-brand">{correctCount}</span>
            <span className="text-gray-500">/{totalAsked || 0}</span>
            <span className="text-gray-500 text-xs md:text-base ml-1">
              {t("trainingPage.questionsCorrect")}
            </span>
          </div>
          <div className="w-full bg-brand-border-light rounded-full h-2 mt-2 max-w-md mx-auto">
            <div
              className="bg-brand h-2 rounded-full transition-all"
              style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OutroPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gradient-to-br from-brand-light to-brand-gradient-to" />}>
      <OutroContent />
    </Suspense>
  );
}
