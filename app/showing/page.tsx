import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import Link from "next/link";
import { Phone, Calendar, Home, CheckCircle, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { CALENDLY_SHOWING_URL } from "@/lib/calendly";

export const metadata: Metadata = {
  alternates: {
    canonical: "/showing",
  },
  robots: { index: true, follow: true },
  title: "Schedule a Home Showing Las Vegas",
  description:
    "Book a private home showing in Spring Valley, Las Vegas, Henderson, or Summerlin with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties. Call (702) 664-8424.",
  keywords: [
    "schedule home showing Las Vegas",
    "book property tour Las Vegas",
    "Spring Valley home showing",
    "private showing Las Vegas realtor",
    "Dr. Jan Duffy showing",
  ],
  openGraph: {
    title: "Schedule a Home Showing | Spring Valley Las Vegas",
    description:
      "Pick a time for a private tour of Spring Valley and Las Vegas Valley homes with Dr. Jan Duffy.",
    url: `${siteConfig.url}/showing`,
    type: "website",
  },
};

const showingSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Schedule a Home Showing",
  description:
    "Book a private home showing or buyer consultation with Dr. Jan Duffy in the Las Vegas Valley.",
  url: `${siteConfig.url}/showing`,
  mainEntity: {
    "@type": "RealEstateAgent",
    name: agentInfo.name,
    telephone: agentInfo.phoneTel,
    email: agentInfo.email,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I schedule a home showing in Las Vegas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the calendar on this page to book a private showing with Dr. Jan Duffy, or call (702) 664-8424. Share the addresses or neighborhoods you want to tour and we will confirm access and timing.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a pre-approval before touring homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-approval is strongly recommended for occupied homes and competitive offers, but we can often arrange early tours while you finalize financing. Call Dr. Jan Duffy to discuss your situation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I tour Spring Valley and Summerlin homes in one day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We plan efficient routes across Spring Valley, Summerlin, Henderson, and nearby communities so you see the best-fit homes without wasted drive time.",
      },
    },
  ],
};

const steps = [
  {
    title: "Pick a time",
    body: "Choose a slot on the calendar for a phone consult or in-person tour.",
  },
  {
    title: "Share your list",
    body: "Send MLS numbers, addresses, or neighborhoods—Spring Valley, Summerlin, Henderson, and more.",
  },
  {
    title: "Tour with confidence",
    body: "Dr. Jan Duffy coordinates access, pricing context, and next steps after each showing.",
  },
];

export default function ShowingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto max-w-5xl px-4">
          <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-slate-700">Schedule a showing</span>
          </nav>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            Private tours
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Schedule a home showing in Las Vegas
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-slate-600">
            Book a private showing for Spring Valley, Summerlin, Henderson, and Las Vegas Valley
            homes with {agentInfo.name}, REALTOR® at {officeInfo.name}. Prefer to call?{" "}
            <a
              href={agentInfo.phoneTel}
              className="font-semibold text-blue-600 hover:underline"
            >
              {agentInfo.phone}
            </a>
            .
          </p>

          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                  <CheckCircle className="h-4 w-4 text-blue-600" aria-hidden />
                  {step.title}
                </div>
                <p className="text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mb-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-blue-600 px-4 py-4 text-center text-white">
              <h2 className="text-2xl font-bold">Book your showing</h2>
              <p className="mt-1 text-sm text-blue-100">
                Inline scheduler — same calendar used for private tours and consultations
              </p>
            </div>
            <CalendlyWidget url={CALENDLY_SHOWING_URL} height="700px" />
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Home className="h-5 w-5 text-blue-600" aria-hidden />
                Before you tour
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Browse live inventory on our{" "}
                  <Link href="/listings" className="font-medium text-blue-600 hover:underline">
                    MLS listings
                  </Link>{" "}
                  page.
                </li>
                <li>
                  Explore{" "}
                  <Link
                    href="/neighborhoods/spring-valley"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Spring Valley
                  </Link>{" "}
                  and other west-valley communities.
                </li>
                <li>
                  Relocating? Read our{" "}
                  <Link href="/relocation" className="font-medium text-blue-600 hover:underline">
                    relocation guide
                  </Link>
                  .
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-slate-900">
                <MapPin className="h-5 w-5 text-blue-600" aria-hidden />
                Office
              </h2>
              <p className="text-sm text-slate-700">
                {officeInfo.name}
                <br />
                {officeInfo.address.street}
                <br />
                {officeInfo.address.city}, {officeInfo.address.state}{" "}
                {officeInfo.address.zip}
              </p>
              <a
                href={agentInfo.phoneTel}
                className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {agentInfo.phone}
              </a>
            </div>
          </div>

          <section aria-labelledby="showing-faq-heading" className="mb-8">
            <h2 id="showing-faq-heading" className="mb-4 text-2xl font-bold text-slate-900">
              Showing FAQs
            </h2>
            <dl className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <dt className="font-semibold text-slate-900">
                  How do I schedule a home showing in Las Vegas?
                </dt>
                <dd className="mt-1 text-sm text-slate-600">
                  Use the calendar above or call {agentInfo.phone}. Share the homes or areas you
                  want to see and we will confirm access.
                </dd>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <dt className="font-semibold text-slate-900">
                  Do I need a pre-approval before touring homes?
                </dt>
                <dd className="mt-1 text-sm text-slate-600">
                  Pre-approval is strongly recommended for occupied homes and strong offers. We can
                  still plan early tours while financing is in progress.
                </dd>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <dt className="font-semibold text-slate-900">
                  Can I tour Spring Valley and Summerlin homes in one day?
                </dt>
                <dd className="mt-1 text-sm text-slate-600">
                  Yes. We build efficient routes across Spring Valley, Summerlin, Henderson, and
                  nearby communities.
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
