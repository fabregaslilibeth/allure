import type { Metadata } from "next";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { aboreto, assistant } from "@/lib/fonts";

export const metadata: Metadata = {
  title: { default: "Allure — Skin & Aesthetics", template: "%s — Allure" },
  description:
    "Personalised skin treatments in a serene sanctuary: laser rejuvenation, facials, exosomes and microneedling.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${aboreto.variable} ${assistant.variable}`}>
      <body className="bg-secondary font-display text-primary antialiased">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
