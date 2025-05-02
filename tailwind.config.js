// tailwind.config.js

const sds = require("@czi-sds/components/dist/tailwind.json");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{tsx,scss}",
    "./sanity/**/*.{tsx,scss}",
    "./components/**/*.{tsx,scss}",
  ],
  theme: {
    extend: {
      ...sds,

      fontFamily: {
        // Next.js `next/font` font variables
        "sds-body": ["var(--font-inter)", "sans-serif"],
        "sds-caps": ["var(--font-inter)", "sans-serif"],
        "sds-code": ["var(--font-ibm-plex-mono)", "monospace"],
        "sds-header": ["var(--font-inter)", "sans-serif"],
        "sds-tabular": ["var(--font-inter)", "sans-serif"],
        // Override default Tailwind fonts
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      container: {
        center: true,
        padding: {
          // These paddings don't actually work,
          // because the screens (breakpoints)
          // is 1280px only, but this also controls the container's
          // max-width, so I can't change it
          DEFAULT: sds.spacing["sds-xl"],
          md: sds.spacing["sds-xxl"],
        },
        screens: {
          DEFAULT: "1280px",
        },
      },
      colors: {
        // Copied from biohubOverrides.ts
        dark: {
          ...sds.colors.dark,
          "sds-color-primitive-blue-50": "#00A0DD",
          "sds-color-primitive-blue-75": "#00A0DD",
          "sds-color-primitive-blue-100": "#00A0DD",
          "sds-color-primitive-blue-200": "#00A0DD",
          "sds-color-primitive-blue-300": "#00A0DD",
          "sds-color-primitive-blue-400": "#0D7CB5",
          "sds-color-primitive-blue-500": "#0D7CB5",
          "sds-color-primitive-blue-600": "#065B86",
          "sds-color-primitive-blue-700": "#065B86",
          "sds-color-primitive-blue-800": "#002F47",
          "sds-color-primitive-blue-900": "#002F47",
          "sds-color-semantic-accent-text-action": "#00A0DD",
        },
        light: {
          ...sds.colors.light,
          "sds-color-primitive-blue-50": "#002F47",
          "sds-color-primitive-blue-75": "#002F47",
          "sds-color-primitive-blue-100": "#065B86",
          "sds-color-primitive-blue-200": "#065B86",
          "sds-color-primitive-blue-300": "#0D7CB5",
          "sds-color-primitive-blue-400": "#0D7CB5",
          "sds-color-primitive-blue-500": "#00A0DD",
          "sds-color-primitive-blue-600": "#00A0DD",
          "sds-color-primitive-blue-700": "#00A0DD",
          "sds-color-primitive-blue-800": "#00A0DD",
          "sds-color-primitive-blue-900": "#00A0DD",
          "sds-color-semantic-accent-text-action": "#0D7CB5",
          "sds-color-semantic-accent-text-action-hover": "#065B86",
          "sds-color-semantic-accent-text-action-pressed": "#002F47",
        },
      },
    },
  },
  plugins: [typography],
};
