import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
// Uses FIREBASE_SERVICE_ACCOUNT_KEY environment variable (JSON string)
// or GOOGLE_APPLICATION_CREDENTIALS file path

let firebaseAdminApp: App | null = null;
let firestoreDb: Firestore | null = null;
let adminAuth: Auth | null = null;

function initializeFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Try to use service account from environment variable
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    try {
      const parsed = JSON.parse(serviceAccount);
      return initializeApp({
        credential: cert(parsed),
        projectId: parsed.project_id,
      });
    } catch (error) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error);
    }
  }

  // Fall back to default credentials (works in GCP environments)
  return initializeApp({
    projectId: 'driving-test-app-a5c67',
  });
}

function getAdminApp(): App {
  if (!firebaseAdminApp) {
    firebaseAdminApp = initializeFirebaseAdmin();
  }
  return firebaseAdminApp;
}

export function getAdminDb(): Firestore {
  if (!firestoreDb) {
    firestoreDb = getFirestore(getAdminApp());
  }
  return firestoreDb;
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    adminAuth = getAuth(getAdminApp());
  }
  return adminAuth;
}
