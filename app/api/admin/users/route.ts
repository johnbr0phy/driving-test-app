import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getApps } from 'firebase-admin/app';
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
    const app = getApps()[0];
    const auth = getAuth(app);

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!isAdminEmail(decodedToken.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all users from Firestore
    const db = getAdminDb();
    const usersSnapshot = await db.collection('users').get();

    // Get Auth users to get emails
    const authUsers = await auth.listUsers(1000);
    const authUserMap = new Map(
      authUsers.users.map(u => [u.uid, { email: u.email, createdAt: u.metadata.creationTime }])
    );

    // Combine Firestore and Auth data
    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      const authData = authUserMap.get(doc.id);
      return {
        uid: doc.id,
        email: authData?.email || 'Unknown',
        selectedState: data.selectedState || null,
        lastUpdated: data.lastUpdated || null,
        createdAt: authData?.createdAt || null,
        testsCompleted: data.completedTests?.length || 0,
        trainingProgress: data.training?.totalCorrectAllTime || 0,
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
