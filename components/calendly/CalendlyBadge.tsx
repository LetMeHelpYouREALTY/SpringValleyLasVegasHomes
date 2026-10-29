"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CALENDLY_SHOWING_URL, resolveCalendlyUrl } from "@/lib/calendly";
import "./types";

interface CalendlyBadgeProps {
  url?: string;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

export default function CalendlyBadge({
  url = CALENDLY_SHOWING_URL,
  text = "Schedule time with me",
  color = "#0069ff",
  textColor = "#ffffff",
  branding = true,
}: CalendlyBadgeProps) {
  const calendlyUrl = resolveCalendlyUrl(url);

  useEffect(() => {
    // Initialize badge widget when Calendly script is loaded
    const initBadge = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: calendlyUrl,
          text,
          color,
          textColor,
          branding,
        });
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      initBadge();
    } else {
      // Wait for script to load
      window.addEventListener("calendly-loaded", initBadge);
    }

    return () => {
      window.removeEventListener("calendly-loaded", initBadge);
    };
  }, [calendlyUrl, text, color, textColor, branding]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Stylesheet joins the script after load so it never blocks first paint
          if (!document.querySelector('link[href$="calendly.com/assets/external/widget.css"]')) {
            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "https://assets.calendly.com/assets/external/widget.css";
            document.head.appendChild(css);
          }
          if (window.Calendly) {
            window.Calendly.initBadgeWidget({
              url: calendlyUrl,
              text,
              color,
              textColor,
              branding,
            });
          }
        }}
      />
    </>
  );
}
