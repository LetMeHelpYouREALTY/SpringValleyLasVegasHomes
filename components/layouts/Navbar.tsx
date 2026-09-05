"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { realScoutConfig } from "@/lib/integrations";
import { buildMainNavLinks, navbarServiceLinks } from "@/lib/site-navigation";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showNavSimpleSearch = !isHome;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = !isHome || isScrolled || isMobileMenuOpen;
  const mainNavLinks = buildMainNavLinks(realScoutConfig.portalUrl);
  const serviceLinks = navbarServiceLinks;
  const linkClass = cn(
    "text-[13px] font-light uppercase tracking-luxury px-2 py-3",
    solid ? "text-ink hover:text-navy" : "text-white hover:text-white/80",
  );

  return (
    <nav
      aria-label="Primary"
      data-rs-nav-search={showNavSimpleSearch ? "1" : "0"}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid ? "bg-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent",
        isScrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-col min-w-0"
            aria-label={`${siteConfig.logoTitle}, ${siteConfig.logoSubtitle}`}
          >
            <span
              className={cn(
                "text-sm sm:text-base font-normal uppercase tracking-luxury leading-snug",
                solid ? "text-ink" : "text-white",
              )}
            >
              {siteConfig.logoTitle}
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider hidden sm:block mt-0.5 font-light",
                solid ? "text-mist" : "text-white/80",
              )}
            >
              {siteConfig.logoSubtitle}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) =>
              link.external === true ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ),
            )}

            <div className="relative">
              <button
                className={cn(linkClass, "flex items-center")}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsServicesOpen(!isServicesOpen);
                  } else if (e.key === "Escape") {
                    setIsServicesOpen(false);
                  }
                }}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-label="Services menu"
              >
                Services
                <ChevronDown className="h-3 w-3 ml-1" aria-hidden="true" />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 bg-white/95 py-2 z-50 shadow-sm"
                  onMouseLeave={() => setIsServicesOpen(false)}
                  role="menu"
                  aria-orientation="vertical"
                >
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-[13px] font-light uppercase tracking-wider text-ink hover:bg-cream"
                      onClick={() => setIsServicesOpen(false)}
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href={agentInfo.phoneTel}
              className={cn(
                "ml-3 inline-flex items-center gap-2 border px-5 py-2.5 text-[11px] font-bold uppercase tracking-luxury",
                solid
                  ? "border-ink text-ink hover:bg-ink hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-ink",
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">{agentInfo.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <a
              href={agentInfo.phoneTel}
              className={cn(
                "inline-flex items-center justify-center border p-2",
                solid ? "border-ink text-ink" : "border-white text-white",
              )}
              aria-label={`Call ${agentInfo.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              className={cn("p-1", solid ? "text-ink" : "text-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-black/10 bg-cream">
            <div className="flex flex-col space-y-1 pt-4">
              {mainNavLinks.map((link) =>
                link.external === true ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-light uppercase tracking-luxury text-[13px] py-2 px-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-ink font-light uppercase tracking-luxury text-[13px] py-2 px-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}

              <div className="border-t border-black/10 pt-2 mt-2">
                <span className="text-[11px] font-light text-mist px-3 uppercase tracking-luxury">
                  Services
                </span>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-ink font-light uppercase tracking-luxury text-[13px] py-2 px-3 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4 px-3">
                <a
                  href={agentInfo.phoneTel}
                  className="btn-luxury-solid w-full"
                >
                  Call {agentInfo.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {showNavSimpleSearch ? (
        <div className="border-t border-black/10 bg-cream">
          <RealScoutSimpleSearch />
        </div>
      ) : null}
    </nav>
  );
}
