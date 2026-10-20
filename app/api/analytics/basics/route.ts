import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { EXAMS_V2 } from '@/lib/v2/registry';

// Basics usage events from every browser (lib/v2/basicsTracking). One
// aggregate doc, analytics/v2Basics:
//   exams.<exam>.<event>            { total, daily.<YYYY-MM-DD> }
//   exams.<exam>.<event>_basics     exam_start / drill_mastered after a learned skill
//   exams.<exam>.<event>_cold       ...with none learned in that drill
//   skills.<exam>.<skill>.<event>   per-skill counts (skill_open, skill_learned, brushup*)
//   drills.<exam>.<drill>.<event>[_basics|_cold]
const EVENTS = new Set(['skill_open', 'skill_learned', 'brushup_shown', 'brushup', 'exam_start', 'drill_mastered']);
const SKILL_EVENTS = new Set(['skill_open', 'skill_learned', 'brushup_shown', 'brushup']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const event = typeof body.event === 'string' ? body.event : '';
    const exam = EXAMS_V2.find((e) => e.id === body.exam);
    const drill = exam?.drills.find((d) => d.key === body.drill);
    if (!EVENTS.has(event) || !exam || !drill?.basics?.length) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }
    const isSkillEvent = SKILL_EVENTS.has(event);
    const skill = typeof body.skill === 'string' ? body.skill : '';
    if (isSkillEvent && !drill.basics.includes(skill)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];
    const bump = { total: FieldValue.increment(1), daily: { [today]: FieldValue.increment(1) } };
    const examEvents: Record<string, unknown> = { [event]: bump };
    const drillEvents: Record<string, unknown> = { [event]: FieldValue.increment(1) };
    if (!isSkillEvent) {
      const split = `${event}_${body.basicsFirst === true ? 'basics' : 'cold'}`;
      examEvents[split] = bump;
      drillEvents[split] = FieldValue.increment(1);
    }
    const update: Record<string, unknown> = {
      exams: { [exam.id]: examEvents },
      drills: { [exam.id]: { [drill.key]: drillEvents } },
    };
    if (isSkillEvent) update.skills = { [exam.id]: { [skill]: { [event]: FieldValue.increment(1) } } };

    await getAdminDb().doc('analytics/v2Basics').set(update, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error tracking basics event:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
