import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { SchoolLandingCta } from "@/components/SchoolLandingCta";
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
            sameAs: [canonicalUrl],
          }),
        }}
      />

      <div className="bg-gradient-to-b from-brand-light to-white">
        <div className="flex flex-col items-center px-4 py-20">
          <div className="max-w-2xl w-full text-center">

            {/* School logo or initial avatar */}
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
                <div className="w-24 h-24 rounded-2xl bg-brand flex items-center justify-center shadow-md">
                  <span className="text-4xl font-bold text-white">
                    {school.schoolName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Eyebrow */}
            <p className="text-sm font-medium text-brand uppercase tracking-wider mb-2">
              Practice test — provided by
            </p>

            {/* School name */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {school.schoolName}
            </h1>

            {/* Value prop */}
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Free DMV practice tests, set up by{" "}
              <span className="text-brand font-semibold">{school.schoolName}</span>
            </p>

            <p className="text-gray-500 mb-10 max-w-lg mx-auto">
              Covers all sections of the real DMV test. Trusted by driving schools across
              the US to help students pass first time.
            </p>

            {/* Primary CTA */}
            <SchoolLandingCta signupUrl={signupUrl} />

            <p className="mt-4 text-sm text-gray-400">
              No credit card required. Takes 30 seconds to sign up.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="max-w-2xl w-full mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "📝", title: "8 sections covered", desc: "All topics on the real DMV test" },
              { icon: "🎯", title: "Track your progress", desc: "See which sections you need to work on" },
              { icon: "✅", title: "Pass first time", desc: "Students who practise score 40% better" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
