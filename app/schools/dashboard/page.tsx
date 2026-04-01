"use client";

import { useState, useMemo, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus, Trash2, AlertTriangle, CheckCircle2, X, Clock, Check,
  Loader2, LogIn, School, Settings, Upload, ImageIcon, UserX, Eye, EyeOff,
} from "lucide-react";
import type { SchoolStudent } from "@/lib/school-types";
import { useSchoolAuth } from "@/lib/hooks/useSchoolAuth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";

// --- Config ---
const SCHOOL_NAME = "Smith Driving Academy";
const PLAN_TIER = "Growth";
const TOTAL_SEATS = 20;
const TOTAL_SECTIONS = 8;

// --- Mock data (only fields we actually use) ---
const mockStudents: SchoolStudent[] = [
  { uid: "1",  name: "Alex Johnson",    email: "alex.j@email.com",   testsTaken: 8, lastActive: "2026-03-29", active: true },
  { uid: "2",  name: "Maria Garcia",    email: "maria.g@email.com",  testsTaken: 5, lastActive: "2026-03-28", active: true },
  { uid: "3",  name: "James Wilson",    email: "james.w@email.com",  testsTaken: 8, lastActive: "2026-03-27", active: true },
  { uid: "4",  name: "Sarah Chen",      email: "sarah.c@email.com",  testsTaken: 3, lastActive: "2026-03-26", active: true },
  { uid: "5",  name: "David Kim",       email: "david.k@email.com",  testsTaken: 1, lastActive: "2026-03-22", active: true },
  { uid: "6",  name: "Emily Davis",     email: "emily.d@email.com",  testsTaken: 7, lastActive: "2026-03-29", active: true },
  { uid: "7",  name: "Ryan Martinez",   email: "ryan.m@email.com",   testsTaken: 4, lastActive: "2026-03-25", active: true },
  { uid: "8",  name: "Olivia Brown",    email: "olivia.b@email.com", testsTaken: 0, lastActive: "2026-03-10", active: false },
  { uid: "9",  name: "Ethan Taylor",    email: "ethan.t@email.com",  testsTaken: 6, lastActive: "2026-03-28", active: true },
  { uid: "10", name: "Sophia Lee",      email: "sophia.l@email.com", testsTaken: 8, lastActive: "2026-03-29", active: true },
  { uid: "11", name: "Daniel Harris",   email: "daniel.h@email.com", testsTaken: 2, lastActive: "2026-03-18", active: true },
  { uid: "12", name: "Ava Robinson",    email: "ava.r@email.com",    testsTaken: 8, lastActive: "2026-03-27", active: true },
];

const DMV_SECTIONS = [
  "Road Signs",
  "Traffic Laws",
  "Right of Way",
  "Parking",
  "Speed Limits",
  "Safe Driving",
  "Alcohol & Drugs",
  "Special Situations",
];

// ── Settings Panel ──────────────────────────────────────────────────────────
interface SettingsPanelProps {
  onClose: () => void;
  schoolId: string | null;
  currentLogoUrl: string | undefined;
  onLogoUpdated: (url: string) => void;
  isDemoMode: boolean;
}

function SettingsPanel({ onClose, schoolId, currentLogoUrl, onLogoUpdated, isDemoMode }: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl ?? null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setUploadError("Only PNG or JPG files are supported.");
      return;
    }

    // Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File must be under 2MB.");
      return;
    }

    setUploadError(null);
    setSuccessMsg(null);

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    if (isDemoMode || !schoolId) {
      // Demo mode: just show the preview, don't persist
      setSuccessMsg("Logo preview updated (demo mode — log in to save).");
      return;
    }

    // Upload to Firebase Storage
    setUploading(true);
    try {
      const ext = file.type === "image/png" ? "png" : "jpg";
      const path = `schools/${schoolId}/logo.${ext}`;
      const sRef = storageRef(storage, path);
      await uploadBytes(sRef, file, { contentType: file.type });
      const downloadUrl = await getDownloadURL(sRef);

      // Update Firestore doc
      const schoolDocRef = doc(db, "school_accounts", schoolId);
      await updateDoc(schoolDocRef, { logoUrl: downloadUrl });

      onLogoUpdated(downloadUrl);
      setPreviewUrl(downloadUrl);
      setSuccessMsg("Logo saved successfully.");
    } catch (err) {
      console.error("[logo upload]", err);
      setUploadError("Upload failed. Please try again.");
      setPreviewUrl(currentLogoUrl ?? null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">School Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Logo section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">School Logo</h3>

            {/* Logo preview */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="School logo"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  PNG or JPG, max 2MB. Shown on your public school page and dashboard header.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" />
                      {previewUrl ? "Replace logo" : "Upload logo"}
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Status messages */}
            {uploadError && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                {uploadError}
              </div>
            )}
            {successMsg && (
              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                {successMsg}
              </div>
            )}
          </div>

          {/* Demo mode note */}
          {isDemoMode && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
              You&apos;re in demo mode. <Link href="/schools/login" className="underline font-medium">Log in</Link> to save changes.
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Section tooltip ─────────────────────────────────────────────────────────
function SectionTooltip({ done, totalSections }: { done: number; totalSections: number }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center gap-3 justify-center group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Mini progress bar */}
      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
        <div
          className={`h-full rounded-full transition-all ${
            done >= totalSections
              ? "bg-green-500"
              : done >= totalSections / 2
              ? "bg-brand"
              : "bg-gray-300"
          }`}
          style={{ width: `${(done / totalSections) * 100}%` }}
        />
      </div>
      {/* Fraction */}
      <span
        className={`text-sm font-semibold tabular-nums w-8 text-right flex-shrink-0 cursor-default ${
          done >= totalSections ? "text-green-600" : "text-gray-700"
        }`}
      >
        {done}/{totalSections}
      </span>

      {/* Tooltip popover */}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="bg-gray-900 text-white rounded-xl shadow-xl px-4 py-3 w-48">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">
              Sections
            </p>
            <ul className="space-y-1.5">
              {DMV_SECTIONS.map((section, i) => {
                const isDone = i < done;
                return (
                  <li key={section} className="flex items-center gap-2">
                    {isDone ? (
                      <Check className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                    ) : (
                      <span className="h-3.5 w-3.5 flex-shrink-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 inline-block" />
                      </span>
                    )}
                    <span
                      className={`text-xs ${
                        isDone ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {section}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-2.5 h-2.5 bg-gray-900 rotate-45 -mt-1.5" />
          </div>
        </div>
      )}
    </div>
  );
}

/** Determine if a student is "Active" (tested in last 14 days) or "Pending" (not started / inactive) */
function getStudentStatus(student: SchoolStudent): "active" | "pending" {
  if (student.testsTaken === 0) return "pending";
  const lastDate = new Date(student.lastActive);
  const diffDays = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14 ? "active" : "pending";
}

function StatusBadge({ status }: { status: "active" | "pending" }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      <Clock className="h-3 w-3" />
      Pending
    </span>
  );
}

// Wrap in Suspense at the export level so useSearchParams doesn't block prerender
export default function SchoolDashboardPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="text-sm">Loading…</p>
      </div>
    }>
      <DashboardInner />
    </Suspense>
  );
}

function DashboardInner() {
  const searchParams = useSearchParams();
  const { user, schoolId: authSchoolId, schoolData, loading: authLoading, error: authError } = useSchoolAuth();

  // ?school= param acts as admin override; otherwise use auth-derived schoolId
  const schoolIdOverride = searchParams.get("school");
  const schoolId = schoolIdOverride ?? authSchoolId;

  // Determine mode
  const isAuthenticated = !!user;
  const hasSchool = !!schoolId;
  const isDemoMode = !isAuthenticated || !hasSchool;

  const [students, setStudents] = useState<SchoolStudent[]>(
    isDemoMode ? mockStudents : []
  );
  const [loading, setLoading] = useState(!isDemoMode);
  const [error, setError] = useState<string | null>(authError);
  const [showSettings, setShowSettings] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  // Local logo URL — can be updated optimistically after upload
  const [localLogoUrl, setLocalLogoUrl] = useState<string | undefined>(schoolData?.logoUrl);

  // Sync localLogoUrl when schoolData loads
  useEffect(() => {
    if (schoolData?.logoUrl) setLocalLogoUrl(schoolData.logoUrl);
  }, [schoolData?.logoUrl]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviting, setInviting] = useState(false);
  // deactivate = soft (sets active:false); remove = hard delete with confirm dialog
  const [deactivateConfirm, setDeactivateConfirm] = useState<string | null>(null);
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null);

  // ── Load students from Firestore (via API) when schoolId is present ──────
  const fetchStudents = useCallback(async () => {
    if (!schoolId) {
      setStudents(mockStudents);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/schools/${schoolId}/students`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStudents(data.students ?? []);
    } catch (err) {
      console.error("[fetchStudents]", err);
      setError("Couldn't load students. Showing demo data.");
      setStudents(mockStudents);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    if (!authLoading) {
      fetchStudents();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, schoolId]);

  const activeStudents = students.filter((s) => s.active);
  const inactiveStudents = students.filter((s) => !s.active);
  const displayedStudents = showInactive ? students : activeStudents;

  // Parse emails live as user types
  const parsedEmails = useMemo(() => {
    return inviteEmails
      .split(/[,\n\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@") && e.includes("."));
  }, [inviteEmails]);

  const totalSeats = schoolData?.totalSeats ?? TOTAL_SEATS;
  const seatsRemaining = totalSeats - activeStudents.length;
  const duplicateEmails = parsedEmails.filter((e) =>
    students.some((s) => s.active && s.email.toLowerCase() === e)
  );
  const newEmailCount = parsedEmails.filter(
    (e) => !students.some((s) => s.active && s.email.toLowerCase() === e)
  ).length;
  const overSeatLimit = newEmailCount > seatsRemaining;

  const handleInvite = async () => {
    const emails = parsedEmails.filter(
      (e) => !students.some((s) => s.active && s.email.toLowerCase() === e)
    );
    if (!emails.length) return;

    if (!isDemoMode && schoolId) {
      // Firebase write
      setInviting(true);
      try {
        const res = await fetch(`/api/schools/${schoolId}/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emails }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await fetchStudents(); // re-sync from Firestore
      } catch (err) {
        console.error("[handleInvite]", err);
        setError("Failed to add students. Please try again.");
      } finally {
        setInviting(false);
      }
    } else {
      // Mock mode: optimistic update
      const newStudents: SchoolStudent[] = emails.map((email, i) => ({
        uid: `new-${Date.now()}-${i}`,
        name: email.split("@")[0],
        email,
        testsTaken: 0,
        lastActive: new Date().toISOString().split("T")[0],
        active: true,
      }));
      setStudents((prev) => [...prev, ...newStudents]);
    }

    setInviteEmails("");
    setShowInvite(false);
  };

  // Soft deactivate — keeps record in Firestore, sets active:false
  const handleDeactivate = async (uid: string) => {
    if (!isDemoMode && schoolId) {
      try {
        const res = await fetch(`/api/schools/${schoolId}/students/${uid}`, {
          method: "PATCH",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStudents((prev) => prev.map((s) => (s.uid === uid ? { ...s, active: false } : s)));
      } catch (err) {
        console.error("[handleDeactivate]", err);
        setError("Failed to deactivate student. Please try again.");
      }
    } else {
      setStudents((prev) => prev.map((s) => (s.uid === uid ? { ...s, active: false } : s)));
    }
    setDeactivateConfirm(null);
  };

  // Hard remove — permanently deletes from subcollection
  const handleRemove = async (uid: string) => {
    if (!isDemoMode && schoolId) {
      try {
        const res = await fetch(`/api/schools/${schoolId}/students/${uid}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStudents((prev) => prev.filter((s) => s.uid !== uid));
      } catch (err) {
        console.error("[handleRemove]", err);
        setError("Failed to remove student. Please try again.");
      }
    } else {
      setStudents((prev) => prev.filter((s) => s.uid !== uid));
    }
    setRemoveConfirm(null);
  };

  // ── Auth loading ────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="text-sm">Checking your account…</p>
      </div>
    );
  }

  // ── Authenticated but no school doc found ────────────────────────────────
  if (isAuthenticated && !hasSchool && !schoolIdOverride) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <div className="bg-brand/10 rounded-full p-4">
          <School className="h-8 w-8 text-brand" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No school account found</h2>
          <p className="text-gray-500 text-sm">
            Your account is linked but we couldn&apos;t find a school profile. Let&apos;s set one up.
          </p>
        </div>
        <Link href="/schools/signup">
          <Button className="bg-brand text-white hover:bg-brand/90">
            Set up your school →
          </Button>
        </Link>
      </div>
    );
  }

  // ── Student list loading ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="text-sm">Loading student data…</p>
      </div>
    );
  }

  const displayName = schoolData?.schoolName ?? SCHOOL_NAME;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Settings panel */}
      {showSettings && (
        <SettingsPanel
          onClose={() => setShowSettings(false)}
          schoolId={schoolId}
          currentLogoUrl={localLogoUrl}
          onLogoUpdated={(url) => setLocalLogoUrl(url)}
          isDemoMode={isDemoMode}
        />
      )}

      {/* Login banner — shown when not authenticated */}
      {!isAuthenticated && (
        <div className="mb-6 bg-brand/5 border border-brand/20 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">You&apos;re viewing a demo</p>
            <p className="text-xs text-gray-500 mt-0.5">Log in to manage your real school and students.</p>
          </div>
          <Link href="/schools/login">
            <Button size="sm" className="bg-brand text-white hover:bg-brand/90 gap-1.5 shrink-0">
              <LogIn className="h-4 w-4" />
              Log in to your school →
            </Button>
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* School logo */}
          {localLogoUrl ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
              <Image
                src={localLogoUrl}
                alt={`${displayName} logo`}
                width={40}
                height={40}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
              <School className="h-5 w-5 text-brand" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {schoolData?.planTier
                ? schoolData.planTier.charAt(0).toUpperCase() + schoolData.planTier.slice(1)
                : PLAN_TIER}{" "}
              plan &middot; Instructor Dashboard
              {isDemoMode && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  Demo
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="School settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          <Button
            onClick={() => setShowInvite(true)}
            size="sm"
            className="bg-brand text-white hover:bg-brand-dark gap-1.5 text-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add students
          </Button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            {error}
          </div>
          <button onClick={() => setError(null)} className="text-amber-500 hover:text-amber-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Seat counter */}
      {(() => {
        const used = activeStudents.length;
        const totalSeats = schoolData?.totalSeats ?? TOTAL_SEATS;
        const planName = schoolData?.planTier
          ? schoolData.planTier.charAt(0).toUpperCase() + schoolData.planTier.slice(1)
          : PLAN_TIER;
        const pct = Math.round((used / totalSeats) * 100);
        const remaining = totalSeats - used;
        const barColor =
          pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-400" : "bg-brand";
        const textColor =
          pct >= 90 ? "text-red-600" : pct >= 70 ? "text-yellow-600" : "text-gray-700";
        return (
          <div className="mb-8 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Seats used</span>
              <span className={`text-sm font-bold tabular-nums ${textColor}`}>
                {used} / {totalSeats}
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {remaining > 0
                ? `${remaining} seat${remaining !== 1 ? "s" : ""} remaining on your ${planName} plan`
                : `All ${totalSeats} seats filled — upgrade to add more students`}
            </p>
          </div>
        );
      })()}

      {/* Student table */}
      <Card>
        <CardHeader className="pb-3 pt-5 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Students
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({activeStudents.length})
              </span>
            </CardTitle>
            {inactiveStudents.length > 0 && (
              <button
                onClick={() => setShowInactive((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                title={showInactive ? "Hide inactive students" : "Show inactive students"}
              >
                {showInactive ? (
                  <><EyeOff className="h-3.5 w-3.5" /> Hide inactive ({inactiveStudents.length})</>
                ) : (
                  <><Eye className="h-3.5 w-3.5" /> Show inactive ({inactiveStudents.length})</>
                )}
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {activeStudents.length === 0 && inactiveStudents.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-gray-400 text-sm mb-4">No students yet.</p>
              <Button
                onClick={() => setShowInvite(true)}
                className="bg-brand text-white hover:bg-brand-dark gap-1.5"
              >
                <UserPlus className="h-4 w-4" />
                Add your first student
              </Button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Student
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 min-w-[180px]">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 pr-6 w-36">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedStudents.map((student) => {
                  const isInactive = !student.active;
                  const done = Math.min(student.testsTaken, TOTAL_SECTIONS);
                  const isDeactivating = deactivateConfirm === student.uid;
                  const isRemoving = removeConfirm === student.uid;
                  const status = getStudentStatus(student);

                  return (
                    <tr
                      key={student.uid}
                      className={`border-b border-gray-100 last:border-0 ${
                        isInactive ? "opacity-50 bg-gray-50/80" : "hover:bg-gray-50/50"
                      }`}
                    >
                      {/* Name / Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className={`font-medium ${isInactive ? "text-gray-400 line-through" : "text-gray-900"}`}>
                              {student.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{student.email}</p>
                          </div>
                          {isInactive && (
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 shrink-0">
                              Inactive
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Progress: bar + X/8 + hover tooltip */}
                      <td className="px-6 py-4">
                        <SectionTooltip done={done} totalSections={TOTAL_SECTIONS} />
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-4 text-center">
                        {isInactive ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                            Deactivated
                          </span>
                        ) : (
                          <StatusBadge status={status} />
                        )}
                      </td>

                      {/* Actions — deactivate (soft) or remove (hard) */}
                      <td className="px-6 py-4 text-right">
                        {isDeactivating ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setDeactivateConfirm(null)}
                              className="text-xs text-gray-400 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeactivate(student.uid)}
                              className="text-xs font-medium text-amber-600 hover:text-amber-700"
                            >
                              Deactivate
                            </button>
                          </div>
                        ) : isRemoving ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setRemoveConfirm(null)}
                              className="text-xs text-gray-400 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleRemove(student.uid)}
                              className="text-xs font-medium text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        ) : isInactive ? (
                          // Inactive students: only show hard remove
                          <button
                            onClick={() => setRemoveConfirm(student.uid)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                            title="Permanently remove student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          // Active students: deactivate (soft) + remove (hard)
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setDeactivateConfirm(student.uid)}
                              className="text-gray-300 hover:text-amber-500 transition-colors p-1 rounded"
                              title="Deactivate student (keeps record)"
                            >
                              <UserX className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setRemoveConfirm(student.uid)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded"
                              title="Permanently remove student"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-bold text-gray-900">Add students</h2>
              <button
                onClick={() => { setShowInvite(false); setInviteEmails(""); }}
                className="text-gray-400 hover:text-gray-600 transition-colors -mr-1 -mt-1 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              Paste email addresses — one per line or comma-separated.
            </p>

            {/* Seats remaining hint */}
            <p className="text-xs text-gray-400 mb-4">
              {seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} remaining on your plan.
            </p>

            <textarea
              autoFocus
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm h-36 focus:outline-none focus:ring-2 focus:ring-brand resize-none font-mono"
              placeholder={"student1@school.com\nstudent2@school.com\nstudent3@school.com"}
            />

            {/* Live feedback */}
            {parsedEmails.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {/* Valid count */}
                <div className="flex items-center gap-1.5 text-xs text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                  {newEmailCount} valid email{newEmailCount !== 1 ? "s" : ""} ready to invite
                </div>

                {/* Duplicates */}
                {duplicateEmails.length > 0 && (
                  <div className="flex items-start gap-1.5 text-xs text-amber-700">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>
                      {duplicateEmails.length} already enrolled (will be skipped):{" "}
                      <span className="text-amber-600">{duplicateEmails.join(", ")}</span>
                    </span>
                  </div>
                )}

                {/* Over seat limit */}
                {overSeatLimit && (
                  <div className="flex items-start gap-1.5 text-xs text-red-700">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Only {seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} available.
                      Upgrade your plan to add all {newEmailCount} students.
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => { setShowInvite(false); setInviteEmails(""); }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-brand text-white hover:bg-brand-dark gap-1.5"
                onClick={handleInvite}
                disabled={newEmailCount === 0 || overSeatLimit || inviting}
              >
                {inviting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Inviting…
                  </>
                ) : newEmailCount > 0 ? (
                  `Invite ${newEmailCount} student${newEmailCount !== 1 ? "s" : ""}`
                ) : (
                  "Invite"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
