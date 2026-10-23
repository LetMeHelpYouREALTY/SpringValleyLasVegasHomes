import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { Shield, Users, Globe, Award, TrendingUp, CheckCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { absoluteMediaUrl, faviconSrc } from "@/lib/site-media";

export const metadata: Metadata = {
  alternates: {
    canonical: "/why-berkshire-hathaway",
  },
  title: "Why Work With Dr. Jan Duffy",
  description:
    "Why work with Dr. Jan Duffy, REALTOR®: in real estate since 1983, $127M+ in closed transactions, and deep knowledge of Las Vegas, Henderson, and Summerlin neighborhoods.",
  keywords: [
    "Berkshire Hathaway HomeServices",
    "why choose BHHS",
    "Warren Buffett real estate",
    "trusted real estate brand",
    "BHHS Nevada Properties",
  ],
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Berkshire Hathaway HomeServices",
  url: "https://www.bhhs.com",
  logo: absoluteMediaUrl(faviconSrc),
  description:
    "Berkshire Hathaway HomeServices is a real estate brokerage network, part of Berkshire Hathaway Inc., one of the world's most respected and trusted companies.",
  parentOrganization: {
    "@type": "Corporation",
    name: "Berkshire Hathaway Inc.",
    founder: "Warren Buffett",
  },
};

export default function WhyBerkshireHathawayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              In Real Estate Since 1983
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Why Work With Dr. Jan Duffy?
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              When you work with Dr. Jan Duffy, REALTOR®, you get an advisor who has been in real
              estate since 1983 and who puts trust, ethical standards, and honest advice first.
            </p>
          </div>

          {/* Key Benefits */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              What You Can Expect
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Trust and Integrity</h3>
                <p className="text-slate-600">
                  Honest advice and transparent communication in every transaction, from first
                  consultation to closing.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Referral Connections</h3>
                <p className="text-slate-600">
                  Moving to or from Las Vegas? Dr. Jan coordinates with trusted agents in other
                  cities so both sides of your move stay on track.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Marketing</h3>
                <p className="text-slate-600">
                  Professional photography, MLS syndication, and targeted digital marketing that
                  reach qualified buyers.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ethical Standards</h3>
                <p className="text-slate-600">
                  As a REALTOR®, Dr. Jan adheres to the REALTOR® Code of Ethics. Your interests
                  always come first.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Local Market Knowledge</h3>
                <p className="text-slate-600">
                  Accurate pricing and negotiation grounded in current MLS data and neighborhood-level
                  insight across Southern Nevada.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Proven Results</h3>
                <p className="text-slate-600">
                  $127M+ in closed transactions and 500+ satisfied clients across Southern Nevada.
                </p>
              </div>
            </div>
          </section>

          {/* Local Expert Section */}
          <section className="mb-16 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Your Local Expert in Las Vegas
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  Dr. Jan Duffy serves Las Vegas, Henderson, Summerlin, and all of Southern Nevada.
                  In real estate since 1983 with $127M+ in closed transactions, she pairs deep
                  experience with hometown expertise.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "In real estate since 1983",
                    "$127M+ in closed transactions",
                    "500+ satisfied clients",
                    "Specializing in luxury, investment, and relocation",
                    "Deep knowledge of every Las Vegas neighborhood",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about"
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                >
                  Meet Dr. Jan Duffy →
                </Link>
              </div>
              <div className="bg-slate-100 rounded-lg p-8">
                <blockquote className="text-lg text-slate-700 italic mb-4">
                  "My job isn't just to show you houses—it's to make sure you don't overpay, that
                  you understand what you're buying, and that you're protected through every step
                  of the transaction."
                </blockquote>
                <cite className="text-slate-900 font-semibold">
                  — Dr. Jan Duffy, REALTOR®
                </cite>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "How long has Dr. Jan Duffy been in real estate?",
                  a: "Dr. Jan Duffy has been in real estate since 1983, with $127M+ in closed transactions and 500+ satisfied clients across Las Vegas, Henderson, and Summerlin.",
                },
                {
                  q: "Does working with Dr. Jan cost more?",
                  a: "No. Commission rates are negotiable and comparable to other brokerages. The value you receive—professional marketing, accurate pricing, and experienced negotiation—often helps homes sell faster and for more money.",
                },
                {
                  q: "Can Dr. Jan help with relocations to Las Vegas?",
                  a: "Yes! Dr. Jan Duffy can coordinate with agents in your current city while providing expert guidance on Las Vegas neighborhoods, schools, and communities.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Difference
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Ready to work with a REALTOR® in real estate since 1983? Contact Dr. Jan Duffy today.
            </p>
            <a
              href="tel:+17026648424"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 664-8424
            </a>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
