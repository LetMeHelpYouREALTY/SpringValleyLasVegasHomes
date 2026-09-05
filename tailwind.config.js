/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        script: ["var(--font-great-vibes)", "cursive"],
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
};
