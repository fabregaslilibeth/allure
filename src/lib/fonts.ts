import { Aboreto, Assistant } from "next/font/google";

/** Display face (caps only, single weight): headings, labels, UI. */
export const aboreto = Aboreto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aboreto",
  display: "swap",
});

/** Body face for running copy. */
export const assistant = Assistant({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-assistant",
  display: "swap",
});
