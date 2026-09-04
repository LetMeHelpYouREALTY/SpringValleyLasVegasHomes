import type { Config } from "tailwindcss";

/**
 * Palette matched to kim-bibb.com (Luxury Presence):
 * white canvas, #f8f8f8 bands, black type, navy #374D6D accent.
 */
const config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        cream: "#f8f8f8",
        navy: "#374D6D",
        mist: "#9B9B9B",
      },
      fontFamily: {
        sans: [
          "Helvetica",
          "Helvetica Neue",
          "Arial",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        luxury: "0.12em",
        headline: "0.08em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
