import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import SiteBylineDate from "@/components/shared/SiteBylineDate";
import {
  agentInfo,
  officeInfo,
  siteConfig,
  teamInfo,
  siteSocialUrls,
} from "@/lib/site-config";
import { realScoutConfig } from "@/lib/integrations";
import { footerQuickLinks, footerServiceLinks } from "@/lib/site-navigation";
import { seoPrimaryKeyword } from "@/lib/seo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[#f6edd8] border-t border-[#c9a227]/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">
              Berkshire Hathaway HomeServices
            </h3>
            <p className="text-slate-300 mb-4 text-sm">
              Nevada Properties — {seoPrimaryKeyword}, Las Vegas, Henderson, and
              Summerlin. Backed by Warren Buffett&apos;s legacy of trust.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteSocialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Spring Valley Las Vegas Homes on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteSocialUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Dr. Jan Duffy on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteSocialUrls.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Spring Valley Las Vegas Homes on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteSocialUrls.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Dr. Jan Duffy on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links — internal + MLS portal; anchors match lib/site-navigation for crawl consistency */}
          <nav aria-label="Quick links" className="min-w-0">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`${realScoutConfig.portalUrl}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Search all MLS listings
                </a>
              </li>
              {footerQuickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Real estate services" className="min-w-0">
            <h3 className="font-bold text-lg mb-4">Real Estate Services</h3>
            <ul className="space-y-2">
              {footerServiceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info - NAP (Name, Address, Phone) */}
          <div>
            <h3 className="font-bold text-lg mb-4">{siteConfig.name}</h3>
            <div className="flex items-start mb-3">
              <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm">
                {officeInfo.address.street}
                <br />
                {officeInfo.address.city}, {officeInfo.address.state}{" "}
                {officeInfo.address.zip}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
              {teamInfo.teamLeader.role}
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href={agentInfo.phoneTel}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  {agentInfo.phone}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href={`mailto:${teamInfo.teamLeader.email}`}
                  className="text-slate-300 hover:text-white transition-colors text-sm break-all"
                >
                  {teamInfo.teamLeader.email}
                </Link>
              </li>
            </ul>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
              {teamInfo.buyerAgent.role}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href={teamInfo.buyerAgent.phoneTel}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  {teamInfo.buyerAgent.phone}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href={`mailto:${teamInfo.buyerAgent.email}`}
                  className="text-slate-300 hover:text-white transition-colors text-sm break-all"
                >
                  {teamInfo.buyerAgent.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="mb-6 flex justify-center md:justify-start">
            <SiteBylineDate
              variant="compact"
              className="text-center md:text-left"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Berkshire Hathaway HomeServices Nevada Properties.
              All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/faq"
                className="text-slate-400 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">
            Dr. Jan Duffy, REALTOR® | License S.0197614.LLC | Berkshire Hathaway
            HomeServices Nevada Properties
          </p>
          <p className="text-slate-600 text-xs mt-2 text-center max-w-3xl mx-auto">
            When you work with a Berkshire Hathaway HomeServices agent, you're
            backed by a name synonymous with trust, ethical standards, and
            financial strength.
          </p>
        </div>
      </div>
    </footer>
  );
}
