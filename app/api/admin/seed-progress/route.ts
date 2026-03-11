import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';
import { getQuestionsData } from '@/lib/testGenerator';

// POST /api/admin/seed-progress
// Sets training sets to 50/50 and all 4 practice tests to passed (80%+)
// Admin-only, requires Bearer token auth
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(token);

    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = getAdminDb();
    const userRef = db.collection('users').doc(decoded.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data()!;
    const selectedState = userData.selectedState || 'CA';

    // Get all questions for the user's state
    const allQuestions = getQuestionsData('en');
    const universalQuestions = allQuestions.filter(q => q.type === 'Universal');
    const stateQuestions = allQuestions.filter(q => q.state === selectedState);

    // Build training sets: each set gets 50 questions (40 universal + 10 state)
    const trainingSets: Record<number, { masteredIds: string[]; wrongQueue: string[] }> = {};
    for (let setId = 1; setId <= 4; setId++) {
      const uStart = (setId - 1) * 40;
      const sStart = (setId - 1) * 10;
      const setQuestions = [
        ...universalQuestions.slice(uStart, uStart + 40),
        ...stateQuestions.slice(sStart, sStart + 10),
      ];
      trainingSets[setId] = {
        masteredIds: setQuestions.map(q => q.questionId),
        wrongQueue: [],
      };
    }

    // Build test attempts: all 4 tests passed with 45/50
    const now = new Date().toISOString();
    const testAttempts = [1, 2, 3, 4].map(testNumber => ({
      testNumber,
      state: selectedState,
      attemptCount: 1,
      firstScore: 45,
      bestScore: 45,
      lastAttemptDate: now,
    }));

    // Build completed tests (minimal — just enough for the store to recognize them)
    const completedTests = [1, 2, 3, 4].map(testNumber => {
      const uStart = (testNumber - 1) * 40;
      const sStart = (testNumber - 1) * 10;
      const questions = [
        ...universalQuestions.slice(uStart, uStart + 40),
        ...stateQuestions.slice(sStart, sStart + 10),
      ];
      return {
        id: `test-${testNumber}-seed-${Date.now()}`,
        testNumber,
        state: selectedState,
        questions,
        answers: questions.map((q, _i) => ({
          questionId: q.questionId,
          userAnswer: q.correctAnswer,
          isCorrect: true,
          answeredAt: now,
        })),
        startedAt: now,
        completedAt: now,
        score: 45,
        totalQuestions: 50,
      };
    });

    // Update Firestore
    await userRef.update({
      trainingSets,
      testAttempts,
      completedTests,
      currentTests: {},
      training: {
        questionsAnswered: [],
        correctCount: 0,
        incorrectCount: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalCorrectAllTime: 50, // well past onboarding threshold
        masteredQuestionIds: trainingSets[1].masteredIds.slice(0, 50),
        lastQuestionId: null,
      },
      lastUpdated: now,
    });

    return NextResponse.json({
      success: true,
      message: 'Progress seeded: 4 training sets at 50/50, 4 tests passed at 90%',
      state: selectedState,
    });
  } catch (error) {
    console.error('Seed progress error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
