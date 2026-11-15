"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { appointmentHref } from "@/data/links";
import { menuPanel } from "@/lib/anim";
import { cn } from "@/lib/cn";
import Nav from "./Nav";

const MENU_ID = "site-menu";

export default function Header() {
  const onHome = usePathname() === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setIsOpen(false);

  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 40));

  useEffect(() => setScrolled(window.scrollY > 40), []);

  // Freeze the page while the menu covers it.
  useEffect(() => {
    if (isOpen) lenis?.stop();
    else lenis?.start();
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Over the home hero the bar is transparent with white text; everywhere
  // else it becomes a frosted lilac bar so the text stays readable.
  const showBar = !isOpen && (scrolled || !onHome);
  const darkText = isOpen || showBar;
  const hideWordmark = onHome && !scrolled && !isOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 bg-secondary"
        variants={menuPanel}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      />

      <div
        className={cn(
          "relative grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 transition-[background-color,color] duration-500 md:px-8 md:py-5",
          darkText ? "text-primary" : "text-white",
          showBar && "bg-secondary/85 backdrop-blur-md",
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          className="flex cursor-pointer items-center gap-3 justify-self-start text-xs uppercase tracking-[0.2em] md:text-sm"
        >
          <Burger open={isOpen} />
          {isOpen ? "Close" : "Menu"}
        </button>

        <Link
          href="/"
          onClick={close}
          className={cn(
            "text-lg tracking-[0.35em] transition-opacity duration-500 md:text-xl",
            hideWordmark && "pointer-events-none opacity-0",
          )}
        >
          Allure
        </Link>

        <Link
          href={appointmentHref}
          onClick={close}
          className="justify-self-end text-xs uppercase tracking-[0.2em] hover:underline md:text-sm"
        >
          <span className="md:hidden">Book</span>
          <span className="hidden md:inline">Make an appointment</span>
        </Link>
      </div>

      <AnimatePresence mode="wait">{isOpen && <Nav id={MENU_ID} onNavigate={close} />}</AnimatePresence>
    </header>
  );
}

function Burger({ open }: { open: boolean }) {
  const line =
    "absolute left-0 h-px w-full bg-current transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]";
  return (
    <span aria-hidden className="relative block h-2.5 w-6">
      <span className={cn(line, "top-0", open && "translate-y-[4.5px] rotate-45")} />
      <span className={cn(line, "bottom-0", open && "-translate-y-[4.5px] -rotate-45")} />
    </span>
  );
}
