export interface SchoolAccount {
  id: string;
  schoolName: string;
  planTier: "starter" | "growth" | "school";
  totalSeats: number;
  adminEmail: string;
  adminName: string;
  createdAt: string;
  active: boolean;
}

export interface SchoolStudent {
  uid: string;
  name: string;
  email: string;
  testsTaken: number;
  lastActive: string;
  active: boolean;
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
