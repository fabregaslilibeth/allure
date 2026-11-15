import localFont from "next/font/local";

// Self-hosted (both fonts are SIL Open Font License, from Google Fonts, Latin
// subset). next/font/google downloads fonts at build time, and Next 15.5
// crashes the whole build when Google Fonts answers with an unexpected file URL,
// which made deploys fail intermittently.

/** Display face (caps only, single weight): headings, labels, UI. */
export const aboreto = localFont({
  src: "../fonts/aboreto-latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-aboreto",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** Body face for running copy (variable font, weights 200–800). */
export const assistant = localFont({
  src: "../fonts/assistant-latin-variable.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-assistant",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
