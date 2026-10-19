import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/resend';
import { CAMPAIGN_REPLY_TO } from '@/lib/cron-email';
import { SCHOOL_KIND_LABELS, schoolKind } from '@/lib/schoolHosts';
import { getCatalogEntryByPath } from '@/lib/testCatalog';
import { classExamInfo, isClassCode, normalizeClassCode } from '@/lib/classes';

// Visits from a school's LMS or website (lib/schoolReferral.ts). One doc per
// host in schoolReferrals, with per-course and per-landing counts. The first
// visit from a new host, or from a new course at a known host, emails John:
// each is a teacher who chose to post a TigerTest link. Anyone can call this,
// so the host must classify as a school and alerts are capped per day.

const MAX_ALERTS_PER_DAY = 20;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const host = typeof body.host === 'string' ? body.host.toLowerCase().slice(0, 120) : '';
    const kind = schoolKind(host);
    if (!kind || !/^[a-z0-9.-]+$/.test(host)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const course = typeof body.course === 'string' && /^_?\d[\d_]{0,20}$/.test(body.course) ? body.course : '';
    const landing =
      typeof body.landing === 'string' && body.landing.startsWith('/') ? body.landing.split('?')[0].slice(0, 120) : '/';
    const now = new Date().toISOString();
    const today = now.slice(0, 10);
    const db = getAdminDb();
    const ref = db.collection('schoolReferrals').doc(host);

    // Firestore map keys: a landing path is stored with its slashes swapped
    // for '|', a course as is (digits and underscores).
    const landingKey = landing.replace(/\//g, '|');
    const { newHost, newCourse } = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.data() ?? {};
      const newHost = !snap.exists;
      const newCourse = !!course && !data.courses?.[course];
      const prevCourse = course ? data.courses?.[course] : undefined;
      tx.set(
        ref,
        {
          host,
          kind,
          firstSeen: data.firstSeen ?? now,
          lastSeen: now,
          visits: (data.visits ?? 0) + 1,
          daily: { [today]: (data.daily?.[today] ?? 0) + 1 },
          landings: { [landingKey]: (data.landings?.[landingKey] ?? 0) + 1 },
          ...(course
            ? {
                courses: {
                  [course]: {
                    firstSeen: prevCourse?.firstSeen ?? now,
                    lastSeen: now,
                    visits: (prevCourse?.visits ?? 0) + 1,
                    landing: prevCourse?.landing ?? landing,
                  },
                },
              }
            : {}),
        },
        { merge: true },
      );
      return { newHost, newCourse };
    });

    if (newHost || newCourse) await alertJohn({ host, kind, course, landing, newHost, today });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[school-referral] failed:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function alertJohn(a: { host: string; kind: keyof typeof SCHOOL_KIND_LABELS; course: string; landing: string; newHost: boolean; today: string }) {
  const db = getAdminDb();
  const budget = db.doc('analytics/schoolReferralAlerts');
  const allowed = await db.runTransaction(async (tx) => {
    const sent = (await tx.get(budget)).data()?.daily?.[a.today] ?? 0;
    if (sent >= MAX_ALERTS_PER_DAY) return false;
    tx.set(budget, { daily: { [a.today]: sent + 1 } }, { merge: true });
    return true;
  });
  if (!allowed) return;

  // A class join link (/c/<code>) says nothing about its test in the path,
  // so the class doc names the test and the teacher.
  const cls = await classForLanding(a.landing);
  const exam = cls ? { name: cls.examName, shortName: cls.examName } : getCatalogEntryByPath(a.landing);
  const lms = SCHOOL_KIND_LABELS[a.kind];
  const courseUrl = a.course && a.kind === 'canvas' ? `https://${a.host}/courses/${a.course}` : '';
  const what = a.newHost ? 'A new school sent a visitor' : 'A new course at a known school sent a visitor';
  const result = await sendEmail({
    kind: 'transactional',
    to: CAMPAIGN_REPLY_TO,
    subject: `${a.newHost ? 'New school' : 'New course'}: ${a.host} (${lms}) → ${exam.shortName}`,
    html: `<p><strong>${what}.</strong> Someone there posted a TigerTest link, probably a teacher.</p>
<p>School: ${esc(a.host)} (${lms})<br>
${a.course ? `Course id: ${esc(a.course)}${courseUrl ? ` (<a href="${courseUrl}">${esc(courseUrl)}</a>, needs a login there)` : ''}<br>` : ''}
Landed on: <a href="https://tigertest.io${esc(a.landing)}">${esc(a.landing)}</a> (${esc(exam.name)})</p>
${
  cls
    ? `<p>It is a class join link.<br>
Class: ${esc(cls.name || cls.code)} (${esc(cls.code)})<br>
Teacher: ${esc(cls.teacherName || 'not given')}<br>
School: ${esc(cls.school || 'not given')}</p>
`
    : ''
}<p>Look the school up and find the program's instructor: they already chose TigerTest.</p>`,
  });
  if (!result.ok) console.error('[school-referral] alert failed:', result.error);
}

async function classForLanding(landing: string) {
  const m = /^\/c\/([^/]+)\/?$/.exec(landing);
  if (!m) return null;
  const code = normalizeClassCode(m[1]);
  if (!isClassCode(code)) return null;
  try {
    const snap = await getAdminDb().collection('classes').doc(code).get();
    const c = snap.data();
    const info = c && typeof c.examId === 'string' ? classExamInfo(c.examId, c.state) : undefined;
    if (!c || !info) return null;
    return {
      code,
      examName: info.name,
      name: String(c.name ?? ''),
      teacherName: String(c.teacherName ?? ''),
      school: String(c.school ?? ''),
    };
  } catch (error) {
    console.error('[school-referral] class lookup failed:', error);
    return null;
  }
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
