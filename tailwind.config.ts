import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c9a227",
          50: "#fbf6e8",
          100: "#f3e6c4",
          200: "#e6d08a",
          300: "#d4b45c",
          400: "#e0c35c",
          500: "#c9a227",
          600: "#a6851c",
          700: "#7c5c08",
          800: "#5c4408",
          900: "#3d2e06",
          950: "#1a1405",
        },
        ink: {
          DEFAULT: "#070604",
          900: "#12100c",
          800: "#1a160f",
        },
        cream: "#f6edd8",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
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
