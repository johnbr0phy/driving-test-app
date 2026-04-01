"use client";

import { useState, useMemo, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus, Trash2, AlertTriangle, CheckCircle2, X, Clock, Check,
  Loader2, LogIn, School, Settings, Upload, ImageIcon, Eye, EyeOff,
  Copy, ExternalLink, ChevronDown, ChevronUp, Share2, Users, Mail,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
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

// Invite status — pending = invited but not yet signed up; accepted = active student
type InviteStatus = "pending" | "accepted";

interface DashboardStudent extends SchoolStudent {
  inviteStatus?: InviteStatus;
  latestScore?: number; // 0–100
}

// --- Mock data ---
const mockStudents: DashboardStudent[] = [
  { uid: "1",  name: "Alex Johnson",   email: "alex.j@email.com",   testsTaken: 12, lastActive: "2026-03-29", active: true,  inviteStatus: "accepted", latestScore: 88 },
  { uid: "2",  name: "Maria Garcia",   email: "maria.g@email.com",  testsTaken: 7,  lastActive: "2026-03-28", active: true,  inviteStatus: "accepted", latestScore: 62 },
  { uid: "3",  name: "James Wilson",   email: "james.w@email.com",  testsTaken: 14, lastActive: "2026-03-27", active: true,  inviteStatus: "accepted", latestScore: 91 },
  { uid: "4",  name: "Sarah Chen",     email: "sarah.c@email.com",  testsTaken: 4,  lastActive: "2026-03-26", active: true,  inviteStatus: "accepted", latestScore: 55 },
  { uid: "5",  name: "David Kim",      email: "david.k@email.com",  testsTaken: 1,  lastActive: "2026-03-22", active: true,  inviteStatus: "accepted", latestScore: 40 },
  { uid: "6",  name: "Emily Davis",    email: "emily.d@email.com",  testsTaken: 10, lastActive: "2026-03-29", active: true,  inviteStatus: "accepted", latestScore: 85 },
  { uid: "7",  name: "Ryan Martinez",  email: "ryan.m@email.com",   testsTaken: 5,  lastActive: "2026-03-25", active: true,  inviteStatus: "accepted", latestScore: 58 },
  { uid: "8",  name: "Olivia Brown",   email: "olivia.b@email.com", testsTaken: 0,  lastActive: "2026-03-10", active: true,  inviteStatus: "pending",  latestScore: undefined },
  { uid: "9",  name: "pending invite", email: "ethan.t@email.com",  testsTaken: 0,  lastActive: "",          active: true,  inviteStatus: "pending",  latestScore: undefined },
  { uid: "10", name: "Sophia Lee",     email: "sophia.l@email.com", testsTaken: 9,  lastActive: "2026-03-29", active: true,  inviteStatus: "accepted", latestScore: 92 },
  { uid: "11", name: "Daniel Harris",  email: "daniel.h@email.com", testsTaken: 3,  lastActive: "2026-03-18", active: true,  inviteStatus: "accepted", latestScore: 48 },
  { uid: "12", name: "Ava Robinson",   email: "ava.r@email.com",    testsTaken: 11, lastActive: "2026-03-27", active: true,  inviteStatus: "accepted", latestScore: 87 },
];

// ── Student status logic ────────────────────────────────────────────────────
function getStudentReadiness(s: DashboardStudent): "pass-ready" | "needs-work" | "new" {
  if (s.inviteStatus === "pending" || s.testsTaken === 0) return "new";
  const score = s.latestScore ?? 0;
  if (score >= 80) return "pass-ready";
  return "needs-work";
}

function ReadinessBadge({ status }: { status: "pass-ready" | "needs-work" | "new" }) {
  if (status === "pass-ready") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Pass-ready
      </span>
    );
  }
  if (status === "needs-work") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
        Needs work
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      <Clock className="h-3 w-3" />
      New
    </span>
  );
}

function InviteBadge({ status }: { status: InviteStatus }) {
  if (status === "accepted") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-brand/10 text-brand">
        <Check className="h-3 w-3" />
        Joined
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      <Mail className="h-3 w-3" />
      Invited
    </span>
  );
}

// ── Seat counter ─────────────────────────────────────────────────────────────
function SeatCounter({ used, total, planName }: { used: number; total: number; planName: string }) {
  const pct = Math.round((used / total) * 100);
  const remaining = total - used;
  const barColor = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-400" : "bg-brand";
  const textColor = pct >= 90 ? "text-red-600" : pct >= 70 ? "text-yellow-600" : "text-gray-700";

  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Seats used</span>
        <span className={`text-sm font-bold tabular-nums ${textColor}`}>
          {used} / {total}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {remaining > 0
          ? `${remaining} seat${remaining !== 1 ? "s" : ""} remaining · ${planName} plan`
          : `All ${total} seats filled — upgrade to add more students`}
      </p>
    </div>
  );
}

// ── Onboarding Checklist ────────────────────────────────────────────────────
const CHECKLIST_DISMISSED_KEY = "tt_school_checklist_dismissed";
const CHECKLIST_COLLAPSED_KEY = "tt_school_checklist_collapsed";

interface OnboardingChecklistProps {
  schoolId: string | null;
  hasLogo: boolean;
  hasStudents: boolean;
  isDemoMode: boolean;
  onOpenSettings: () => void;
  onOpenInvite: () => void;
}

function OnboardingChecklist({
  schoolId, hasLogo, hasStudents, isDemoMode, onOpenSettings, onOpenInvite,
}: OnboardingChecklistProps) {
  const [dismissed, setDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const key = schoolId ? `${CHECKLIST_DISMISSED_KEY}_${schoolId}` : CHECKLIST_DISMISSED_KEY;
      if (localStorage.getItem(key) === "1") setDismissed(true);
      const collKey = schoolId ? `${CHECKLIST_COLLAPSED_KEY}_${schoolId}` : CHECKLIST_COLLAPSED_KEY;
      if (localStorage.getItem(collKey) === "1") setCollapsed(true);
    } catch { /* SSR */ }
  }, [schoolId]);

  const publicUrl = schoolId ? `https://tigertest.io/schools/${schoolId}` : null;

  const items = [
    {
      id: "logo", label: "Upload your logo", description: "Shown on your public school page",
      done: hasLogo, action: onOpenSettings, actionLabel: "Upload logo", icon: <ImageIcon className="h-4 w-4" />,
    },
    {
      id: "student", label: "Invite your first student", description: "Add a student email to get them started",
      done: hasStudents, action: onOpenInvite, actionLabel: "Add student", icon: <UserPlus className="h-4 w-4" />,
    },
    {
      id: "share", label: "Share your school page",
      description: publicUrl ? `tigertest.io/schools/${schoolId}` : "Your public sign-up link",
      done: false,
      action: publicUrl ? async () => { try { await navigator.clipboard.writeText(publicUrl); } catch { /* ignore */ } } : undefined,
      actionLabel: "Copy link", icon: <Share2 className="h-4 w-4" />,
    },
  ];

  const allDone = items.every((i) => i.done);
  const completedCount = items.filter((i) => i.done).length;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(schoolId ? `${CHECKLIST_DISMISSED_KEY}_${schoolId}` : CHECKLIST_DISMISSED_KEY, "1");
    } catch { /* ignore */ }
  };

  const handleToggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(schoolId ? `${CHECKLIST_COLLAPSED_KEY}_${schoolId}` : CHECKLIST_COLLAPSED_KEY, next ? "1" : "0");
    } catch { /* ignore */ }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (allDone) handleDismiss(); }, [allDone]);

  if (dismissed) return null;

  return (
    <div className="mb-6 bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/20 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {items.map((item) => (
              <div key={item.id} className={`w-2 h-2 rounded-full transition-colors ${item.done ? "bg-green-500" : "bg-brand/30"}`} />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-800">Getting started</span>
          <span className="text-xs text-gray-500">{completedCount}/{items.length} done</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleToggleCollapse} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/60 transition-colors">
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
          <button onClick={handleDismiss} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/60 transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {!collapsed && (
        <div className="border-t border-brand/10 divide-y divide-brand/10">
          {items.map((item) => (
            <div key={item.id} className={`flex items-center gap-4 px-5 py-3 bg-white/40 ${item.done ? "opacity-60" : ""}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.done ? "bg-green-500 border-green-500" : "border-gray-300 bg-white"}`}>
                {item.done && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${item.done ? "line-through text-gray-400" : "text-gray-800"}`}>{item.label}</p>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
              </div>
              {!item.done && item.action && (
                <button
                  onClick={item.action}
                  disabled={isDemoMode && item.id !== "share"}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50 shrink-0"
                >
                  {item.icon}{item.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {isDemoMode && !collapsed && (
        <div className="px-5 py-2.5 bg-amber-50/80 border-t border-amber-100 text-xs text-amber-700">
          <Link href="/schools/login" className="underline font-medium">Log in</Link> to save your progress.
        </div>
      )}
    </div>
  );
}

// ── Settings Panel ──────────────────────────────────────────────────────────
interface SettingsPanelProps {
  onClose: () => void;
  schoolId: string | null;
  schoolData: import("@/lib/school-types").SchoolAccount | null;
  currentLogoUrl: string | undefined;
  onLogoUpdated: (url: string) => void;
  onSchoolInfoUpdated: (patch: { schoolName?: string; adminName?: string; adminEmail?: string }) => void;
  isDemoMode: boolean;
  initialTab?: "school" | "logo" | "danger";
}

type SettingsTab = "school" | "logo" | "danger";

function SettingsPanel({
  onClose, schoolId, schoolData, currentLogoUrl, onLogoUpdated, onSchoolInfoUpdated, isDemoMode, initialTab = "school",
}: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl ?? null);
  const [logoSuccess, setLogoSuccess] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState(schoolData?.schoolName ?? "");
  const [adminName, setAdminName] = useState(schoolData?.adminName ?? "");
  const [adminEmail, setAdminEmail] = useState(schoolData?.adminEmail ?? "");
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [infoSuccess, setInfoSuccess] = useState<string | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const publicUrl = schoolId ? `https://tigertest.io/schools/${schoolId}` : "";

  const handleCopyUrl = async () => {
    if (!publicUrl) return;
    try { await navigator.clipboard.writeText(publicUrl); } catch {
      const el = document.createElement("input"); el.value = publicUrl;
      document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveInfo = async () => {
    if (!schoolId || isDemoMode) {
      setInfoSuccess("Changes previewed (demo mode — log in to save).");
      onSchoolInfoUpdated({ schoolName, adminName, adminEmail });
      return;
    }
    setSavingInfo(true); setInfoError(null); setInfoSuccess(null);
    try {
      const res = await fetch(`/api/schools/${schoolId}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolName, adminName, adminEmail }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onSchoolInfoUpdated({ schoolName, adminName, adminEmail });
      setInfoSuccess("School info saved.");
    } catch (err) { console.error("[save school info]", err); setInfoError("Failed to save. Please try again."); }
    finally { setSavingInfo(false); }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) { setUploadError("Only PNG or JPG files are supported."); return; }
    if (file.size > 2 * 1024 * 1024) { setUploadError("File must be under 2MB."); return; }
    setUploadError(null); setLogoSuccess(null);
    const localUrl = URL.createObjectURL(file); setPreviewUrl(localUrl);
    if (isDemoMode || !schoolId) { setLogoSuccess("Logo preview updated (demo mode — log in to save)."); return; }
    setUploading(true);
    try {
      const ext = file.type === "image/png" ? "png" : "jpg";
      const path = `schools/${schoolId}/logo.${ext}`;
      const sRef = storageRef(storage, path);
      await uploadBytes(sRef, file, { contentType: file.type });
      const downloadUrl = await getDownloadURL(sRef);
      await updateDoc(doc(db, "school_accounts", schoolId), { logoUrl: downloadUrl });
      onLogoUpdated(downloadUrl); setPreviewUrl(downloadUrl); setLogoSuccess("Logo saved successfully.");
    } catch (err) { console.error("[logo upload]", err); setUploadError("Upload failed. Please try again."); setPreviewUrl(currentLogoUrl ?? null); }
    finally { setUploading(false); }
  };

  const handleDelete = async () => {
    if (!schoolId || isDemoMode) return;
    setDeleting(true); setDeleteError(null);
    try {
      const res = await fetch(`/api/schools/${schoolId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.location.href = "/schools";
    } catch (err) { console.error("[delete school]", err); setDeleteError("Failed to delete account. Please try again."); setDeleting(false); }
  };

  const planLabel = schoolData?.planTier ? schoolData.planTier.charAt(0).toUpperCase() + schoolData.planTier.slice(1) : "Free";
  const tabs: { id: SettingsTab; label: string }[] = [
    { id: "school", label: "School Info" }, { id: "logo", label: "Logo" }, { id: "danger", label: "Account" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">School Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex gap-1 px-6 pt-3 border-b border-gray-100 flex-shrink-0">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.id ? "text-brand border-b-2 border-brand" : "text-gray-500 hover:text-gray-700"}`}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {activeTab === "school" && (
            <div className="space-y-5">
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Current plan</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{planLabel}</p>
                </div>
                {(schoolData?.planTier === "free" || !schoolData?.planTier) && (
                  <span className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full font-medium">Upgrade available</span>
                )}
              </div>
              {schoolId && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Your public school page</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 font-mono truncate">{publicUrl}</div>
                    <button onClick={handleCopyUrl} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shrink-0">
                      {copied ? <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
                    </button>
                    <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">Share this link with your students to enroll them.</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">School name</label>
                <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  placeholder="Smith Driving Academy" disabled={isDemoMode} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact name</label>
                <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  placeholder="Jane Smith" disabled={isDemoMode} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact email</label>
                <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  placeholder="jane@smithdriving.com" disabled={isDemoMode} />
              </div>
              {infoError && <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"><AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />{infoError}</div>}
              {infoSuccess && <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2"><CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />{infoSuccess}</div>}
              {isDemoMode && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                  You&apos;re in demo mode. <Link href="/schools/login" className="underline font-medium">Log in</Link> to save changes.
                </div>
              )}
              <Button onClick={handleSaveInfo} disabled={savingInfo || !schoolName.trim()} className="w-full bg-brand text-white hover:bg-brand/90 gap-2">
                {savingInfo ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</> : "Save changes"}
              </Button>
            </div>
          )}
          {activeTab === "logo" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">School Logo</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
                    {previewUrl ? (
                      <Image src={previewUrl} alt="School logo" width={80} height={80} className="object-contain w-full h-full" unoptimized />
                    ) : <ImageIcon className="h-8 w-8 text-gray-300" />}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">PNG or JPG, max 2MB. Shown on your public school page and dashboard header.</p>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      {uploading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Uploading…</> : <><Upload className="h-3.5 w-3.5" />{previewUrl ? "Replace logo" : "Upload logo"}</>}
                    </Button>
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleFileChange} />
                  </div>
                </div>
                {uploadError && <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"><AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />{uploadError}</div>}
                {logoSuccess && <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2"><CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />{logoSuccess}</div>}
              </div>
              {isDemoMode && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
                  You&apos;re in demo mode. <Link href="/schools/login" className="underline font-medium">Log in</Link> to save changes.
                </div>
              )}
            </div>
          )}
          {activeTab === "danger" && (
            <div className="space-y-5">
              {schoolId && (
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">School slug</p>
                  <p className="text-sm font-mono text-gray-800">{schoolId}</p>
                  <p className="text-xs text-gray-400 mt-1">Your slug cannot be changed after signup.</p>
                </div>
              )}
              <div className="border border-red-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-red-700 mb-2">Delete account</h3>
                <p className="text-xs text-gray-600 mb-3">Permanently deletes your school account and all student data. This cannot be undone.</p>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Type <span className="font-mono font-bold">{schoolId ?? "your-school-slug"}</span> to confirm
                </label>
                <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={schoolId ?? "school-slug"} disabled={isDemoMode || deleting}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400" />
                {deleteError && <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3"><AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />{deleteError}</div>}
                <Button variant="outline" onClick={handleDelete}
                  disabled={isDemoMode || deleting || deleteConfirmText !== schoolId}
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 gap-2 disabled:opacity-40">
                  {deleting ? <><Loader2 className="h-4 w-4 animate-spin" />Deleting…</> : <><Trash2 className="h-4 w-4" />Delete school account</>}
                </Button>
                {isDemoMode && <p className="text-xs text-gray-400 mt-2 text-center">Log in to manage your account.</p>}
              </div>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

// ── Share Panel ─────────────────────────────────────────────────────────────
function SharePanel({ onClose, schoolId, schoolName }: { onClose: () => void; schoolId: string | null; schoolName: string }) {
  const publicUrl = schoolId ? `https://tigertest.io/schools/${schoolId}` : "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!publicUrl) return;
    try { await navigator.clipboard.writeText(publicUrl); } catch {
      const el = document.createElement("input"); el.value = publicUrl;
      document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-brand" />
            <h2 className="text-base font-bold text-gray-900">Share your school page</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"><X className="h-4 w-4" /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-gray-500">
            Students who visit your school page and sign up are automatically enrolled under <span className="font-medium text-gray-700">{schoolName}</span>.
          </p>
          {publicUrl ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <QRCodeSVG value={publicUrl} size={160} bgColor="#ffffff" fgColor="#111827" level="M" includeMargin={false} />
              </div>
              <p className="text-xs text-gray-400 text-center">Print this and hand it out — or drop it in your course materials.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4 text-gray-400">
              <School className="h-10 w-10 opacity-30" />
              <p className="text-sm">Log in to generate your QR code.</p>
            </div>
          )}
          {publicUrl && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your public link</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 font-mono truncate">{publicUrl}</div>
                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shrink-0">
                  {copied ? <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
                </button>
              </div>
            </div>
          )}
          {publicUrl && (
            <ul className="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-4">
              <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />Add the link to your course syllabus</li>
              <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />Print the QR code and put it in your classroom</li>
              <li className="flex items-start gap-1.5"><Check className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />Share it in your school&apos;s group chat or email</li>
            </ul>
          )}
          {publicUrl && (
            <a href={publicUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full text-sm font-medium text-brand border border-brand/30 rounded-xl py-2.5 hover:bg-brand/5 transition-colors">
              <ExternalLink className="h-4 w-4" />Preview your school page
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Invite Modal ─────────────────────────────────────────────────────────────
const MAX_BULK_INVITE = 50;

interface InviteModalProps {
  onClose: () => void;
  onInvite: (emails: string[]) => Promise<void>;
  existingEmails: string[];
  seatsRemaining: number;
  inviting: boolean;
}

function InviteModal({ onClose, onInvite, existingEmails, seatsRemaining, inviting }: InviteModalProps) {
  const [inviteEmails, setInviteEmails] = useState("");
  const csvInputRef = useRef<HTMLInputElement>(null);

  const parsedEmails = useMemo(() => {
    return inviteEmails
      .split(/[,\n\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@") && e.includes("."));
  }, [inviteEmails]);

  const duplicateEmails = parsedEmails.filter((e) => existingEmails.includes(e));
  const uniqueNewEmails = parsedEmails.filter((e) => !existingEmails.includes(e));
  const newEmailCount = uniqueNewEmails.length;
  const overBulkLimit = parsedEmails.length > MAX_BULK_INVITE;
  const overSeatLimit = !overBulkLimit && newEmailCount > seatsRemaining;

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const emails = text.split(/[\n\r]+/).flatMap((line) => line.split(","))
        .map((cell) => cell.replace(/["\'\s]/g, "").toLowerCase())
        .filter((v) => v.includes("@") && v.includes("."));
      setInviteEmails((prev) => { const ex = prev.trim(); return ex ? `${ex}\n${emails.join("\n")}` : emails.join("\n"); });
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add students</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} remaining
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded -mr-1 -mt-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-gray-700">
            Paste emails — one per line or comma-separated
          </label>
          <button type="button" onClick={() => csvInputRef.current?.click()}
            className="text-xs text-brand hover:text-brand/80 font-medium underline underline-offset-2">
            Upload CSV
          </button>
          <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvUpload} />
        </div>

        <textarea
          autoFocus
          value={inviteEmails}
          onChange={(e) => setInviteEmails(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm h-36 focus:outline-none focus:ring-2 focus:ring-brand resize-none font-mono"
          placeholder={"student1@school.com\nstudent2@school.com\nstudent3@school.com"}
        />

        {parsedEmails.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {overBulkLimit && (
              <div className="flex items-start gap-1.5 text-xs text-red-700">
                <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                Too many emails — max {MAX_BULK_INVITE} per batch. You have {parsedEmails.length}.
              </div>
            )}
            {!overBulkLimit && (
              <div className="flex items-center gap-1.5 text-xs text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                {newEmailCount} valid email{newEmailCount !== 1 ? "s" : ""} ready to invite
              </div>
            )}
            {duplicateEmails.length > 0 && (
              <div className="flex items-start gap-1.5 text-xs text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                {duplicateEmails.length} already enrolled (will be skipped)
              </div>
            )}
            {overSeatLimit && (
              <div className="flex items-start gap-1.5 text-xs text-red-700">
                <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                Only {seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} available. Upgrade to add all {newEmailCount}.
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button
            className="flex-1 bg-brand text-white hover:bg-brand-dark gap-1.5"
            onClick={() => onInvite(uniqueNewEmails)}
            disabled={newEmailCount === 0 || overSeatLimit || overBulkLimit || inviting}
          >
            {inviting ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Inviting…</>
            ) : newEmailCount > 0 ? (
              `Invite ${newEmailCount} student${newEmailCount !== 1 ? "s" : ""}`
            ) : "Invite"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
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

  const schoolIdOverride = searchParams.get("school");
  const schoolId = schoolIdOverride ?? authSchoolId;
  const isAuthenticated = !!user;
  const hasSchool = !!schoolId;
  const isDemoMode = !isAuthenticated || !hasSchool;

  const [students, setStudents] = useState<DashboardStudent[]>(isDemoMode ? mockStudents : []);
  const [loading, setLoading] = useState(!isDemoMode);
  const [error, setError] = useState<string | null>(authError);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsOpenTab, setSettingsOpenTab] = useState<"school" | "logo" | "danger">("school");
  const [showShare, setShowShare] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null);
  const [showPending, setShowPending] = useState(true);

  const [localLogoUrl, setLocalLogoUrl] = useState<string | undefined>(schoolData?.logoUrl);
  const [localSchoolName, setLocalSchoolName] = useState<string | undefined>(schoolData?.schoolName);
  const [localAdminName, setLocalAdminName] = useState<string | undefined>(schoolData?.adminName);
  const [localAdminEmail, setLocalAdminEmail] = useState<string | undefined>(schoolData?.adminEmail);

  useEffect(() => {
    if (schoolData?.logoUrl) setLocalLogoUrl(schoolData.logoUrl);
    if (schoolData?.schoolName) setLocalSchoolName(schoolData.schoolName);
    if (schoolData?.adminName) setLocalAdminName(schoolData.adminName);
    if (schoolData?.adminEmail) setLocalAdminEmail(schoolData.adminEmail);
  }, [schoolData?.logoUrl, schoolData?.schoolName, schoolData?.adminName, schoolData?.adminEmail]);

  const fetchStudents = useCallback(async () => {
    if (!schoolId) { setStudents(mockStudents); setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/schools/${schoolId}/students`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStudents(data.students ?? []);
    } catch (err) {
      console.error("[fetchStudents]", err);
      setError("Couldn't load students. Showing demo data.");
      setStudents(mockStudents);
    } finally { setLoading(false); }
  }, [schoolId]);

  useEffect(() => { if (!authLoading) fetchStudents(); }, [authLoading, schoolId]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeStudents = students.filter((s) => s.active);
  const pendingStudents = students.filter((s) => s.active && s.inviteStatus === "pending");
  const acceptedStudents = students.filter((s) => s.active && s.inviteStatus !== "pending");

  const totalSeats = schoolData?.totalSeats ?? TOTAL_SEATS;
  const seatsRemaining = totalSeats - activeStudents.length;

  const existingEmails = useMemo(() => activeStudents.map((s) => s.email.toLowerCase()), [activeStudents]);

  const handleInvite = async (emails: string[]) => {
    if (!emails.length) return;
    if (!isDemoMode && schoolId) {
      setInviting(true);
      try {
        const res = await fetch(`/api/schools/${schoolId}/students`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emails }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await fetchStudents();
      } catch (err) { console.error("[handleInvite]", err); setError("Failed to add students. Please try again."); }
      finally { setInviting(false); }
    } else {
      const newStudents: DashboardStudent[] = emails.map((email, i) => ({
        uid: `new-${Date.now()}-${i}`,
        name: email.split("@")[0],
        email,
        testsTaken: 0,
        lastActive: "",
        active: true,
        inviteStatus: "pending" as InviteStatus,
        latestScore: undefined,
      }));
      setStudents((prev) => [...prev, ...newStudents]);
    }
    setShowInvite(false);
  };

  const handleRemove = async (uid: string) => {
    if (!isDemoMode && schoolId) {
      try {
        const res = await fetch(`/api/schools/${schoolId}/students/${uid}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStudents((prev) => prev.filter((s) => s.uid !== uid));
      } catch (err) { console.error("[handleRemove]", err); setError("Failed to remove student. Please try again."); }
    } else {
      setStudents((prev) => prev.filter((s) => s.uid !== uid));
    }
    setRemoveConfirm(null);
  };

  const handleUpgrade = async () => {
    if (!schoolId) return;
    try {
      const res = await fetch(`/api/schools/${schoolId}/billing/checkout`, { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error ?? "Failed to start checkout");
    } catch { setError("Failed to start checkout"); }
  };

  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="text-sm">Checking your account…</p>
      </div>
    );
  }

  if (isAuthenticated && !hasSchool && !schoolIdOverride) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <div className="bg-brand/10 rounded-full p-4"><School className="h-8 w-8 text-brand" /></div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No school account found</h2>
          <p className="text-gray-500 text-sm">Your account is linked but we couldn&apos;t find a school profile.</p>
        </div>
        <Link href="/schools/signup"><Button className="bg-brand text-white hover:bg-brand/90">Set up your school →</Button></Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="text-sm">Loading student data…</p>
      </div>
    );
  }

  const displayName = localSchoolName ?? schoolData?.schoolName ?? SCHOOL_NAME;
  const planName = schoolData?.planTier
    ? schoolData.planTier.charAt(0).toUpperCase() + schoolData.planTier.slice(1)
    : PLAN_TIER;

  // Students to show in table: accepted always; pending shown/hidden by toggle
  const displayedStudents = showPending ? activeStudents : acceptedStudents;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {showShare && <SharePanel onClose={() => setShowShare(false)} schoolId={schoolId} schoolName={displayName} />}
      {showSettings && (
        <SettingsPanel
          onClose={() => setShowSettings(false)}
          schoolId={schoolId}
          schoolData={schoolData ? { ...schoolData, schoolName: localSchoolName ?? schoolData.schoolName, adminName: localAdminName ?? schoolData.adminName, adminEmail: localAdminEmail ?? schoolData.adminEmail } : null}
          currentLogoUrl={localLogoUrl}
          onLogoUpdated={(url) => setLocalLogoUrl(url)}
          onSchoolInfoUpdated={(patch) => {
            if (patch.schoolName !== undefined) setLocalSchoolName(patch.schoolName);
            if (patch.adminName !== undefined) setLocalAdminName(patch.adminName);
            if (patch.adminEmail !== undefined) setLocalAdminEmail(patch.adminEmail);
          }}
          isDemoMode={isDemoMode}
          initialTab={settingsOpenTab}
        />
      )}
      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onInvite={handleInvite}
          existingEmails={existingEmails}
          seatsRemaining={seatsRemaining}
          inviting={inviting}
        />
      )}

      {/* Login banner */}
      {!isAuthenticated && (
        <div className="mb-6 bg-brand/5 border border-brand/20 rounded-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">You&apos;re viewing a demo</p>
            <p className="text-xs text-gray-500 mt-0.5">Log in to manage your real school and students.</p>
          </div>
          <Link href="/schools/login" className="self-stretch sm:self-auto">
            <Button size="sm" className="bg-brand text-white hover:bg-brand/90 gap-1.5 w-full sm:w-auto min-h-[40px]">
              <LogIn className="h-4 w-4" />Log in to your school →
            </Button>
          </Link>
        </div>
      )}

      {/* Onboarding checklist */}
      <OnboardingChecklist
        schoolId={schoolId}
        hasLogo={!!localLogoUrl}
        hasStudents={acceptedStudents.length > 0}
        isDemoMode={isDemoMode}
        onOpenSettings={() => { setSettingsOpenTab("logo"); setShowSettings(true); }}
        onOpenInvite={() => setShowInvite(true)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6">
        <div className="flex items-center gap-3">
          {localLogoUrl ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
              <Image src={localLogoUrl} alt={`${displayName} logo`} width={40} height={40} className="object-contain w-full h-full" unoptimized />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
              <School className="h-5 w-5 text-brand" />
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{displayName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {planName} plan · Instructor Dashboard
              {isDemoMode && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Demo</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:shrink-0">
          <button onClick={() => setShowShare(true)} className="p-2 rounded-lg text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors" title="Share your school page">
            <Share2 className="h-5 w-5" />
          </button>
          <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" title="School settings">
            <Settings className="h-5 w-5" />
          </button>
          <Button onClick={() => setShowInvite(true)} size="sm" className="bg-brand text-white hover:bg-brand-dark gap-1.5 text-sm">
            <UserPlus className="h-4 w-4" />Add students
          </Button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />{error}
          </div>
          <button onClick={() => setError(null)} className="text-amber-500 hover:text-amber-700"><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Seat counter */}
      <SeatCounter used={activeStudents.length} total={totalSeats} planName={planName} />

      {/* Upgrade CTA */}
      {(!schoolData?.planTier || schoolData.planTier === "free") && !isDemoMode && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-amber-800">
            Unlock 20 seats for <span className="font-semibold">$49/mo</span> — upgrade your school plan
          </p>
          <button onClick={handleUpgrade} className="shrink-0 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors">
            Upgrade →
          </button>
        </div>
      )}

      {/* Student table */}
      <Card>
        <CardHeader className="pb-3 pt-5 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Students
              <span className="ml-2 text-sm font-normal text-gray-400">({acceptedStudents.length} enrolled{pendingStudents.length > 0 ? `, ${pendingStudents.length} pending` : ""})</span>
            </CardTitle>
            {pendingStudents.length > 0 && (
              <button
                onClick={() => setShowPending((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPending
                  ? <><EyeOff className="h-3.5 w-3.5" /> Hide pending ({pendingStudents.length})</>
                  : <><Eye className="h-3.5 w-3.5" /> Show pending ({pendingStudents.length})</>}
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {activeStudents.length === 0 ? (
            <div className="px-6 py-16 flex flex-col items-center text-center gap-4">
              <div className="relative mb-2">
                <div className="w-20 h-20 rounded-2xl bg-brand/10 flex items-center justify-center">
                  <Users className="h-10 w-10 text-brand/40" />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-white border-2 border-brand/20 rounded-full flex items-center justify-center">
                  <UserPlus className="h-3.5 w-3.5 text-brand" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">No students yet</h3>
                <p className="text-sm text-gray-400 max-w-xs">Invite your first student and start tracking their DMV prep progress.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <Button onClick={() => setShowInvite(true)} className="bg-brand text-white hover:bg-brand-dark gap-1.5">
                  <UserPlus className="h-4 w-4" />Invite your first student
                </Button>
                {schoolId && (
                  <button
                    onClick={async () => { try { await navigator.clipboard.writeText(`https://tigertest.io/schools/${schoolId}`); } catch { /* ignore */ } }}
                    className="flex items-center justify-center gap-1.5 text-sm text-brand border border-brand/30 rounded-lg px-4 py-2 hover:bg-brand/5 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />Copy school link
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 w-[35%]">Student</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Tests</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 hidden sm:table-cell">Last active</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Score</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Status</th>
                    <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 w-24">Invite</th>
                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.map((student) => {
                    const readiness = getStudentReadiness(student);
                    const inviteStatus = student.inviteStatus ?? "accepted";
                    const isPending = inviteStatus === "pending";
                    const isRemoving = removeConfirm === student.uid;

                    return (
                      <tr
                        key={student.uid}
                        className={`border-b border-gray-100 last:border-0 transition-colors ${
                          isPending ? "bg-gray-50/60 hover:bg-gray-50" : "hover:bg-gray-50/50"
                        }`}
                      >
                        {/* Name / Email */}
                        <td className="px-5 py-3.5">
                          <p className={`font-medium truncate ${isPending ? "text-gray-400" : "text-gray-900"}`}>
                            {isPending ? student.email.split("@")[0] : student.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{student.email}</p>
                        </td>

                        {/* Tests taken */}
                        <td className="px-4 py-3.5 text-center">
                          <span className={`text-sm font-semibold tabular-nums ${isPending ? "text-gray-300" : "text-gray-700"}`}>
                            {isPending ? "—" : student.testsTaken}
                          </span>
                        </td>

                        {/* Last active */}
                        <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                          <span className="text-xs text-gray-400">
                            {isPending || !student.lastActive ? "—" : student.lastActive}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="px-4 py-3.5 text-center">
                          {isPending || student.latestScore === undefined ? (
                            <span className="text-xs text-gray-300">—</span>
                          ) : (
                            <span className={`text-sm font-bold tabular-nums ${
                              student.latestScore >= 80 ? "text-green-600" :
                              student.latestScore >= 60 ? "text-amber-600" : "text-red-500"
                            }`}>
                              {student.latestScore}%
                            </span>
                          )}
                        </td>

                        {/* Readiness status */}
                        <td className="px-4 py-3.5 text-center">
                          <ReadinessBadge status={readiness} />
                        </td>

                        {/* Invite status */}
                        <td className="px-5 py-3.5 text-center">
                          <InviteBadge status={inviteStatus} />
                        </td>

                        {/* Remove */}
                        <td className="px-5 py-3.5 text-right">
                          {isRemoving ? (
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => setRemoveConfirm(null)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                              <button onClick={() => handleRemove(student.uid)} className="text-xs font-medium text-red-600 hover:text-red-700">Remove</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setRemoveConfirm(student.uid)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded"
                              title="Remove student"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick invite CTA below table when students exist */}
      {activeStudents.length > 0 && seatsRemaining > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowInvite(true)}
            className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand/80 font-medium transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            Add more students ({seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} left)
          </button>
        </div>
      )}
    </div>
  );
}
