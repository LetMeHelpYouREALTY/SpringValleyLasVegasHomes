const colors = require("tailwindcss/colors");

/**
 * Luxury theme (Desert Modern Editorial, Oct 2026).
 * `blue` is remapped to a bronze scale and `slate`/`gray` to warm stone, so every existing
 * `blue-*` / `slate-*` class across the site picks up the new palette without per-page edits.
 * Revert by deleting the `colors` overrides below.
 */
const bronze = {
  50: "#faf6f0",
  100: "#f3eadc",
  200: "#e6d4b8",
  300: "#d9b98f",
  400: "#c39a68",
  500: "#a87a47",
  600: "#8a5d30",
  700: "#6e4824",
  800: "#553820",
  900: "#3d2817",
  950: "#24170d",
};

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
        blue: bronze,
        bronze,
        slate: colors.stone,
        gray: colors.stone,
        ink: "#14120f",
        ivory: "#faf7f2",
        sand: "#efe7da",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
    },
  },
  plugins: [],
};
