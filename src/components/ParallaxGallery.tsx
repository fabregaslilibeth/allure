"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

type Speed = "medium" | "fast" | "faster" | "fastest";

type Slot = {
  speed: Speed;
  left: string;
  bottom: string;
  width: string;
  height: string;
  zIndex: number;
  opacity: number;
};

/** Hand-placed positions for six images; extra images reuse them in order. */
const SLOTS: Slot[] = [
  { speed: "medium", left: "10.5vw", bottom: "0vh", width: "25vw", height: "60vh", zIndex: 1, opacity: 0.4 },
  { speed: "fast", left: "5.5vw", bottom: "-80vh", width: "25vw", height: "60vh", zIndex: 2, opacity: 1 },
  { speed: "faster", left: "15vw", bottom: "-40vh", width: "40vh", height: "55vh", zIndex: 3, opacity: 1 },
  { speed: "medium", left: "75vw", bottom: "0vh", width: "50vh", height: "60vh", zIndex: 1, opacity: 0.5 },
  { speed: "fastest", left: "65vw", bottom: "-70vh", width: "30vh", height: "40vh", zIndex: 3, opacity: 1 },
  { speed: "fast", left: "80vw", bottom: "-80vh", width: "45vh", height: "45vh", zIndex: 2, opacity: 1 },
];

/** How far (px) each speed travels over the section's scroll. */
const TRAVEL: Record<Speed, number> = { medium: -500, fast: -1200, faster: -1600, fastest: -2300 };

type Props = {
  images: string[];
  title: string;
  /** Scroll length of the section; longer means slower parallax. */
  height?: string;
};

export default function ParallaxGallery({ images, title, height = "500vh" }: Props) {
  const container = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);

  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => setDark(progress >= 0.1));

  const y: Record<Speed, MotionValue<number>> = {
    medium: useTransform(scrollYProgress, [0, 1], [0, TRAVEL.medium]),
    fast: useTransform(scrollYProgress, [0, 1], [0, TRAVEL.fast]),
    faster: useTransform(scrollYProgress, [0, 1], [0, TRAVEL.faster]),
    fastest: useTransform(scrollYProgress, [0, 1], [0, TRAVEL.fastest]),
  };

  return (
    <section
      ref={container}
      style={{ minHeight: height }}
      className={cn(
        "relative w-full transition-colors duration-500 ease-in-out",
        dark ? "bg-primary text-white" : "text-primary",
      )}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {images.map((src, i) => {
          const { speed, opacity, ...position } = SLOTS[i % SLOTS.length];
          return (
            <motion.div
              key={src}
              className="absolute"
              style={{ y: y[speed], ...position }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image src={src} alt="" fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
            </motion.div>
          );
        })}

        <h2 className="relative z-10 w-full px-4 text-center text-5xl leading-[1.05] sm:text-7xl md:w-1/2 lg:text-9xl">
          {title}
        </h2>
      </div>
    </section>
  );
}
