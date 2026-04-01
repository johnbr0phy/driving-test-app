import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin (server-side only)
function getAdminDb() {
  if (getApps().length === 0) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccount) {
      initializeApp({ credential: cert(JSON.parse(serviceAccount)) });
    } else {
      initializeApp({ projectId: "driving-test-app-a5c67" });
    }
  }
  return getFirestore();
}

interface SchoolData {
  schoolName: string;
  adminEmail: string;
  adminName: string;
  logoUrl?: string;
  planTier?: string;
  active?: boolean;
}

async function getSchool(slug: string): Promise<SchoolData | null> {
  try {
    const db = getAdminDb();
    const docRef = db.collection("school_accounts").doc(slug);
    const snap = await docRef.get();
    if (!snap.exists) return null;
    const data = snap.data() as SchoolData;
    if (data.active === false) return null;
    return data;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ schoolSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { schoolSlug } = await params;
  const school = await getSchool(schoolSlug);

  if (!school) {
    return {
      title: "School Not Found — TigerTest",
      robots: { index: false },
    };
  }

  const title = `${school.schoolName} — Practice Your DMV Test`;
  const description = `Practice your DMV test — set up by ${school.schoolName}. Free practice tests for new drivers.`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "TigerTest",
      ...(school.logoUrl ? { images: [{ url: school.logoUrl }] } : {}),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SchoolLandingPage({ params }: Props) {
  const { schoolSlug } = await params;
  const school = await getSchool(schoolSlug);

  if (!school) {
    notFound();
  }

  const signupUrl = `/signup?school=${encodeURIComponent(schoolSlug)}`;
  const canonicalUrl = `https://tigertest.io/schools/${schoolSlug}`;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: school.schoolName,
            url: canonicalUrl,
            description: `Practice your DMV test — set up by ${school.schoolName}`,
            ...(school.logoUrl ? { logo: school.logoUrl } : {}),
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "instructor",
              email: school.adminEmail,
            },
            sameAs: [`${canonicalUrl}`],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-600">TigerTest</span>
            </Link>
            <div className="flex gap-3">
              <Link
                href="/login?redirect=/schools/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 min-h-[40px] flex items-center rounded-md hover:bg-gray-100 transition-colors"
              >
                School dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">
            {/* School logo or placeholder */}
            <div className="flex justify-center mb-8">
              {school.logoUrl ? (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
                  <Image
                    src={school.logoUrl}
                    alt={`${school.schoolName} logo`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md">
                  <span className="text-4xl font-bold text-white">
                    {school.schoolName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* School name */}
            <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-2">
              Practice test — provided by
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {school.schoolName}
            </h1>

            {/* Value prop */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              Practice your DMV test — set up by{" "}
              <span className="text-indigo-600 font-semibold">{school.schoolName}</span>
            </p>

            <p className="text-gray-500 mb-10 max-w-lg mx-auto">
              Free DMV practice tests covering all 8 sections. Trusted by driving schools
              across the US to help students pass first time.
            </p>

            {/* CTA */}
            <Link
              href={signupUrl}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Start practising free →
            </Link>

            <p className="mt-4 text-sm text-gray-400">
              No credit card required. Takes 30 seconds to sign up.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="max-w-2xl w-full mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
            {[
              { icon: "📝", title: "8 sections covered", desc: "All topics on the real DMV test" },
              { icon: "🎯", title: "Track your progress", desc: "See which sections you need to work on" },
              { icon: "✅", title: "Pass first time", desc: "Students who practise score 40% better" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-200 px-4 py-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              Powered by{" "}
              <Link href="/" className="text-indigo-600 hover:underline font-medium">
                TigerTest
              </Link>{" "}
              — Free DMV practice tests
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
              <Link href="/schools" className="hover:text-gray-700 transition-colors">For schools</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
