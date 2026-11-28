// Read-only comparison of GA purchase events and Stripe-confirmed payment records.
// Run with GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY (Viewer), and the site's
// Firebase credentials. Both dates are inclusive in the GA property's timezone.
// node --env-file=.env.local --import tsx scripts/reconcile-checkout.ts YYYY-MM-DD YYYY-MM-DD
import { GoogleAuth } from "google-auth-library";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getInternalUids } from "../lib/server/internalUsers";
import { isInternalEmail } from "../lib/internal";

const DAY = 86_400_000;
export function validateDates(start: string, end: string) {
  for (const day of [start, end]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(Date.parse(day)) ||
        new Date(day).toISOString().slice(0, 10) !== day) throw Error("Expected two dates in YYYY-MM-DD format.");
  }
  if (start > end) throw Error("Start date must be on or before end date.");
}

// First instant of each civil day, including timezone offset changes at midnight.
export function paymentWindow(start: string, end: string, timeZone: string) {
  const format = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
  function boundary(day: string) {
    let lo = Date.parse(day) - 2 * DAY, hi = Date.parse(day) + 2 * DAY;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (format.format(mid) < day) lo = mid + 1;
      else hi = mid;
    }
    return new Date(lo).toISOString();
  }
  return { from: boundary(start), until: boundary(new Date(Date.parse(end) + DAY).toISOString().slice(0, 10)) };
}

type GaRow = { dimensionValues: { value: string }[]; metricValues: { value: string }[] };
type Quality = { timeZone?: string; subjectToThresholding?: boolean; dataLossFromOtherRow?: boolean; samplingMetadatas?: unknown[] };
type GaPage = { rows?: GaRow[]; rowCount?: number; metadata?: Quality };
const deviceCategory = (d: unknown) => d === "mobile" || d === "tablet" || d === "desktop" ? d : "unknown";

export function reconcile(rows: GaRow[], payments: FirebaseFirestore.DocumentData[], internalUids: Set<string>) {
  const ga = new Map<string, { events: number; device: string }>();
  let gaEventsWithoutUsableId = 0;
  for (const row of rows) {
    const [id, device] = row.dimensionValues.map(d => d.value);
    const events = Number(row.metricValues[0].value);
    if (!id || /^\(.*\)$/.test(id)) { gaEventsWithoutUsableId += events; continue; }
    if (id.startsWith("cs_test_")) continue;
    const prev = ga.get(id);
    const category = deviceCategory(device);
    ga.set(id, { events: events + (prev?.events ?? 0),
      device: prev && prev.device !== category ? "unknown" : category });
  }

  type Outcome = "matched" | "paidOnly" | "gaOnly";
  const counts = () => ({ matched: 0, paidOnly: 0, gaOnly: 0 });
  const totals = counts();
  const byExam = new Map<string, ReturnType<typeof counts>>();
  const byDevice = new Map<string, ReturnType<typeof counts>>();
  const byBuyerState = new Map<string, ReturnType<typeof counts>>();
  function add(outcome: Outcome, exam: string, device: string, buyer: string) {
    totals[outcome]++;
    for (const [group, value] of [[byExam, exam], [byDevice, device], [byBuyerState, buyer]] as const) {
      const bucket = group.get(value) ?? counts();
      bucket[outcome]++;
      group.set(value, bucket);
    }
  }
  let refunded = 0, partiallyRefunded = 0, paymentsWithoutId = 0, duplicatePaymentRecords = 0;
  let duplicateGaEvents = 0;
  const paid = new Set<string>();
  // Remove both sides of internal purchases before counting unmatched GA rows.
  const internal = new Set(payments.filter(p => internalUids.has(p.userId) || isInternalEmail(p.email)).map(p => p.stripeSessionId));
  for (const id of internal) ga.delete(id);
  for (const p of payments) {
    if (!["succeeded", "refunded", "partially_refunded"].includes(p.status) ||
        internalUids.has(p.userId) || isInternalEmail(p.email)) continue;
    const id = p.stripeSessionId;
    if (typeof id !== "string" || !id) { paymentsWithoutId++; continue; }
    if (id.startsWith("cs_test_") || internal.has(id)) continue;
    if (paid.has(id)) { duplicatePaymentRecords++; continue; }
    paid.add(id);
    if (p.status === "refunded") refunded++;
    if (p.status === "partially_refunded") partiallyRefunded++;
    const analytics = ga.get(id);
    if (analytics) duplicateGaEvents += analytics.events - 1;
    const buyer = p.guestCheckout === null ? "signed_in" :
      ["existing_account", "new_account"].includes(p.guestCheckout) ? "guest" : "unknown";
    add(analytics ? "matched" : "paidOnly", p.exam || "unknown",
      deviceCategory(p.checkoutDevice) === "unknown" ? analytics?.device ?? "unknown" : p.checkoutDevice, buyer);
    ga.delete(id);
  }
  for (const { events, device } of ga.values()) { duplicateGaEvents += events - 1; add("gaOnly", "unknown", device, "unknown"); }
  return { totals, refunded, partiallyRefunded, paymentsWithoutId, gaEventsWithoutUsableId,
    duplicateGaEvents, duplicatePaymentRecords, byExam: Object.fromEntries(byExam),
    byDevice: Object.fromEntries(byDevice), byBuyerState: Object.fromEntries(byBuyerState) };
}

// An invalid JSON error can include a segment of the credential.
function parseKey(value: string) {
  try { return JSON.parse(value); } catch { throw Error("Invalid JSON in the service-account environment variable."); }
}

async function run() {
  const [start, end] = process.argv.slice(2);
  validateDates(start, end);
  const property = process.env.GA4_PROPERTY_ID;
  if (!property || !/^\d+$/.test(property)) throw Error("Set GA4_PROPERTY_ID to the numeric property ID.");
  const key = process.env.GA4_SERVICE_ACCOUNT_KEY;
  const auth = new GoogleAuth({ credentials: key ? parseKey(key) : undefined,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"] });
  const rows: GaRow[] = [];
  let timeZone: string | undefined;
  const quality = { subjectToThresholding: false, dataLossFromOtherRow: false, sampled: false };
  const dims = ["transactionId", "deviceCategory"];
  let offset = 0;
  do {
    const response = await auth.request<GaPage>({
      method: "POST", url: `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
      data: { dateRanges: [{ startDate: start, endDate: end }], dimensions: dims.map(name => ({ name })),
        metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName",
          stringFilter: { matchType: "EXACT", value: "purchase" } } }, limit: 10000, offset,
        orderBys: dims.map(dimensionName => ({ dimension: { dimensionName } })) },
    });
    const page = response.data;
    const meta = page.metadata;
    if (!meta?.timeZone || (timeZone && timeZone !== meta.timeZone)) throw Error("Missing or inconsistent GA property timezone.");
    timeZone = meta.timeZone;
    quality.subjectToThresholding ||= !!meta.subjectToThresholding;
    quality.dataLossFromOtherRow ||= !!meta.dataLossFromOtherRow;
    quality.sampled ||= !!meta.samplingMetadatas?.length;
    const batch = page.rows ?? [];
    rows.push(...batch);
    offset += batch.length;
    if (offset >= (page.rowCount ?? 0)) break;
    if (!batch.length) throw Error("GA returned an incomplete page.");
  } while (true);
  const { from, until } = paymentWindow(start, end, timeZone);
  const firebaseKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const app = initializeApp(firebaseKey ? { credential: cert(parseKey(firebaseKey)) } : undefined);
  const [snapshot, internal] = await Promise.all([
    getFirestore(app).collection("payments").where("createdAt", ">=", from).where("createdAt", "<", until)
      .select("stripeSessionId", "status", "email", "userId", "checkoutDevice", "exam", "guestCheckout").get(),
    getInternalUids(),
  ]);
  console.log(JSON.stringify({ start, end, timeZone, quality, ...reconcile(rows, snapshot.docs.map(d => d.data()), internal) }, null, 2));
}

if (require.main === module) run().catch((err: Error) => { console.error(err.message); process.exitCode = 1; });
