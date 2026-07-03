"use client";

import { useEffect, useRef } from "react";
import { CALENDLY_SHOWING_URL, resolveCalendlyUrl } from "@/lib/calendly";

interface CalendlyWidgetProps {
  url?: string;
  minWidth?: string;
  height?: string;
}

export default function CalendlyWidget({
  url = CALENDLY_SHOWING_URL,
  minWidth = "320px",
  height = "700px",
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const calendlyUrl = resolveCalendlyUrl(url);

  useEffect(() => {
    const initWidget = () => {
      if (typeof window !== "undefined" && window.Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = "";

        const widgetDiv = document.createElement("div");
        widgetDiv.className = "calendly-inline-widget";
        widgetDiv.setAttribute("data-url", calendlyUrl);
        widgetDiv.style.minWidth = minWidth;
        widgetDiv.style.height = height;
        widgetDiv.style.width = "100%";

        widgetRef.current.appendChild(widgetDiv);

        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: widgetDiv,
        });
      }
    };

    if (window.Calendly) {
      initWidget();
    } else {
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          initWidget();
        }
      }, 100);

      setTimeout(() => clearInterval(checkCalendly), 10000);
    }
  }, [calendlyUrl, minWidth, height]);

  return (
    <div ref={widgetRef} style={{ minWidth, height, width: "100%" }} />
  );
}
