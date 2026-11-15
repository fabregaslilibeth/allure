"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { appointmentHref } from "@/data/links";
import Button from "./Button";

/** Photo grows to full-bleed while a framed card rises over it. */
export default function StoreFinder() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  const width = useTransform(scrollYProgress, [0, 1], ["20vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 1], ["50vw", "100vh"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);

  return (
    <section ref={container} className="relative h-[200vh]">
      {/* Anchor near the end of the scroll, where the card is in place. */}
      <span id="find-us" className="absolute top-[100vh]" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="relative" style={{ width, height }}>
            <Image src="/images/allure-2.avif" alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
        </div>

        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ y: cardY }}>
          <div className="relative h-[70%] w-[85%] max-w-2xl md:w-[80%]">
            {/* Open frame: the photo shows through. */}
            <div className="absolute inset-x-0 top-0 h-[45%] rounded-t-lg border-8 border-b-0 border-tertiary md:border-12 md:border-b-0" />

            <div className="absolute inset-x-0 bottom-0 flex h-[55%] flex-col items-center justify-center gap-4 rounded-b-lg bg-tertiary p-6 text-center md:p-8">
              <p className="text-sm tracking-[0.3em]">Allure</p>
              <h2 className="text-2xl leading-tight md:text-3xl">
                Where beauty
                <br />
                meets intention
              </h2>
              <p className="max-w-md font-body text-sm leading-relaxed md:text-base">
                Experience personalized care in a serene sanctuary. Every treatment is crafted to enhance your natural
                radiance and restore your inner balance.
              </p>
              <Button href={appointmentHref}>Book a visit</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
