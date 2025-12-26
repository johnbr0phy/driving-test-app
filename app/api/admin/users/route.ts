import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { isAdminEmail } from '@/lib/admin';

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header (Firebase ID token)
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify the token and check if user is admin
    const auth = getAdminAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!isAdminEmail(decodedToken.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all users from Firebase Auth (primary source of truth for accounts)
    const authUsers = await auth.listUsers(1000);

    // Fetch all users from Firestore to get activity data
    const db = getAdminDb();
    const usersSnapshot = await db.collection('users').get();
    const firestoreUserMap = new Map(
      usersSnapshot.docs.map(doc => [doc.id, doc.data()])
    );

    // Combine Auth and Firestore data - iterate through Auth users to include all accounts
    const users = authUsers.users.map(authUser => {
      const firestoreData = firestoreUserMap.get(authUser.uid);
      return {
        uid: authUser.uid,
        email: authUser.email || 'Unknown',
        selectedState: firestoreData?.selectedState || null,
        lastUpdated: firestoreData?.lastUpdated || null,
        createdAt: authUser.metadata.creationTime || null,
        testsCompleted: firestoreData?.completedTests?.length || 0,
        trainingProgress: firestoreData?.training?.totalCorrectAllTime || 0,
      };
    });

    // Sort by creation date (newest first)
    users.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Calculate stats by state
    const stateCounts: Record<string, number> = {};
    users.forEach(user => {
      if (user.selectedState) {
        stateCounts[user.selectedState] = (stateCounts[user.selectedState] || 0) + 1;
      }
    });

    return NextResponse.json({
      users,
      stats: {
        totalUsers: users.length,
        usersWithState: users.filter(u => u.selectedState).length,
        byState: stateCounts,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
