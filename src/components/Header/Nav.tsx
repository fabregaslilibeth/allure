"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/data/links";
import { services } from "@/data/services";
import { menuContent } from "@/lib/anim";
import MenuCredits from "./MenuCredits";
import NavImage from "./NavImage";
import ServiceLinks from "./ServiceLinks";

type Props = { id: string; onNavigate: () => void };

export default function Nav({ id, onNavigate }: Props) {
  // Remember the last hovered service so its image can fade out in place.
  const [preview, setPreview] = useState({ index: 0, visible: false });
  const activeIndex = preview.visible ? preview.index : null;

  const onHover = (index: number | null) =>
    setPreview((prev) => (index === null ? { ...prev, visible: false } : { index, visible: true }));

  return (
    <motion.nav
      id={id}
      aria-label="Site"
      variants={menuContent}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative overflow-hidden px-4 md:px-8"
    >
      <div
        data-lenis-prevent
        className="flex max-h-[calc(100svh-9rem)] flex-col gap-10 overflow-y-auto pb-8 lg:flex-row lg:gap-16"
      >
        <div className="flex flex-col gap-10 lg:w-5/12">
          <ul className="mt-6 flex flex-col gap-1 lg:mt-16">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="text-2xl uppercase transition-opacity hover:opacity-60 md:text-3xl"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <NavImage service={services[preview.index]} visible={preview.visible} />
        </div>

        <div className="lg:flex-1">
          <ServiceLinks
            services={services}
            activeIndex={activeIndex}
            onHover={onHover}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      <MenuCredits />
    </motion.nav>
  );
}
