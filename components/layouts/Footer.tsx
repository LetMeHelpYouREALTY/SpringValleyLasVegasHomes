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

const socialLinkClass =
  "text-ink hover:text-navy transition-colors border border-transparent hover:border-ink p-1";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-ink border-t border-black">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <h3 className="text-sm tracking-luxury leading-snug">{siteConfig.logoTitle}</h3>
            <p className="text-[10px] uppercase tracking-wider text-mist mb-4 font-light">
              {siteConfig.logoSubtitle}
            </p>
            <p className="text-neutral-600 mb-6 text-sm normal-case tracking-normal font-light leading-relaxed">
              {seoPrimaryKeyword} inside unincorporated Clark County—Sahara
              Avenue, Decatur Boulevard, Warm Springs Road, and Hualapai Way.
              Berkshire Hathaway HomeServices Nevada Properties.
            </p>
            <div className="flex space-x-3">
              <a
                href={siteSocialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Spring Valley Las Vegas Homes on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteSocialUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Dr. Jan Duffy on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteSocialUrls.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Spring Valley Las Vegas Homes on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteSocialUrls.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Dr. Jan Duffy on YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links" className="min-w-0">
            <h3 className="text-sm tracking-luxury mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`${realScoutConfig.portalUrl}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-ink text-sm font-light"
                >
                  Search all MLS listings
                </a>
              </li>
              {footerQuickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-neutral-600 hover:text-ink text-sm font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Real estate services" className="min-w-0">
            <h3 className="text-sm tracking-luxury mb-4">
              Real Estate Services
            </h3>
            <ul className="space-y-3">
              {footerServiceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-neutral-600 hover:text-ink text-sm font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm tracking-luxury mb-4">
              {siteConfig.shortName} Nevada Properties
            </h3>
            <div className="flex items-start mb-3">
              <MapPin className="h-4 w-4 mr-3 text-ink flex-shrink-0 mt-0.5" />
              <span className="text-neutral-600 text-sm font-light normal-case tracking-normal">
                {officeInfo.address.street}
                <br />
                {officeInfo.address.city}, {officeInfo.address.state}{" "}
                {officeInfo.address.zip}
              </span>
            </div>
            <p className="text-mist text-[11px] uppercase tracking-luxury mb-2">
              {teamInfo.teamLeader.role}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-ink flex-shrink-0" />
                <Link
                  href={agentInfo.phoneTel}
                  className="text-neutral-600 hover:text-ink text-sm font-light"
                >
                  {agentInfo.phone}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-ink flex-shrink-0" />
                <Link
                  href={`mailto:${teamInfo.teamLeader.email}`}
                  className="text-neutral-600 hover:text-ink text-sm font-light break-all"
                >
                  {teamInfo.teamLeader.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black mt-12 pt-8">
          <div className="mb-6 flex justify-center md:justify-start">
            <SiteBylineDate
              variant="compact"
              className="text-center md:text-left text-neutral-500"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-xs text-center md:text-left font-light uppercase tracking-wider">
              © {currentYear} Berkshire Hathaway HomeServices Nevada Properties.
              All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-luxury">
              <Link href="/faq" className="text-neutral-500 hover:text-ink">
                FAQ
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-neutral-500 hover:text-ink"
              >
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-neutral-500 text-xs mt-6 text-center font-light">
            Dr. Jan Duffy, REALTOR® | License S.0197614.LLC | Berkshire Hathaway
            HomeServices Nevada Properties
          </p>
        </div>
      </div>
    </footer>
  );
}
