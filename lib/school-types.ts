export interface SchoolAccount {
  id: string;
  schoolName: string;
  planTier: "free" | "starter" | "growth" | "school";
  totalSeats: number;
  paidSeats: number;
  adminEmail: string;
  adminName: string;
  adminUid: string;
  createdAt: string;
  active: boolean;
  logoUrl?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface TopicScore {
  topic: string;
  correct: number;
  total: number;
}

export interface SchoolStudent {
  uid: string;
  name: string;
  email: string;
  testsTaken: number;
  lastActive: string;
  active: boolean;
  latestScore?: number;       // 0–100, most recent test score
  inviteStatus?: "pending" | "accepted"; // pending = invited, not yet signed in
  avgScore?: number;          // legacy — kept for API compat
  topicScores?: TopicScore[];
  trend?: "improving" | "declining" | "steady" | "new"; // legacy
}

export interface SchoolLead {
  id?: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  estimatedStudentsPerYear: string;
  howHeard: string;
  submittedAt: string;
}
